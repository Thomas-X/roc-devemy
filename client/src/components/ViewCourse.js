import React, {Component} from 'react';
import axios from 'axios';
import {hashHistory} from 'react-router';
import {Divider, FlatButton, Paper, RaisedButton, TextField} from "material-ui";
import {FormsyText} from "formsy-material-ui";

import Formsy from 'formsy-react';
import * as styles from "../styles";
import Comment from "./Comment";
import {
    ActionBookmark, ActionBookmarkBorder, AlertErrorOutline,
    NavigationArrowForward
} from "material-ui/svg-icons/index";
import {Rating} from "material-ui-rating";

export default class ViewCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {
                title: "PHP",
                imgURL: "https://placekitten.com/640/380",
                authorId: "123321",
                author: "Thomas-X",
                authorEmail: "tzwarts@roc-dev.com",
                URLToCourse: "https://placekitten.com/640/380",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias at" +
                "que aut cumque deleniti dicta esse expedita hic impedit laborum nulla obcaecati, optio quaerat " +
                "quam reprehenderit sit soluta tenetur vero.",
                ratingAverage: 0,
                totalRatingCount: 0,
                allRatingValues: [],
                comments: [{
                    author: "Thomas-X",
                    authorImage: "https://placekitten.com/640/380",
                    comment: "wow dit is een goede cursus zeg!!!",
                    date: Date.now(),
                    authorId: "5946815c213d312034889f0d",
                }
                ],
            },
            createComment: '',
            submitButtonDisabled: true,
        }
        this.commentInput = this.commentInput.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.followCourse = this.followCourse.bind(this);
        this.unFollowCourse = this.unFollowCourse.bind(this);

        this.rateCourse = this.rateCourse.bind(this);
    }


    // TODO add this in production

    // componentWillMount() {
    //     axios.post('/api/getCourse', {courseId: this.props.params.courseid}).then((response) => {
    //         if(response.data.course) {
    //             this.setState({
    //                 course: response.data.course,
    //             })
    //         } else {
    //             hashHistory.push('/' + this.props.route.siteData.role + '/home');
    //         }
    //     })
    // }

    removeComment(commentId) {
        axios.post('/api/removeComment', {
            courseId: this.props.params.courseid,
            userId: this.props.route.siteData._id,
            commentId: commentId
        })
            .then((response) => {
                if (response.data.newComments) {
                    this.state.course.comments = response.data.newComments;
                    this.setState(this.state);
                } else {
                    hashHistory.push(this.props.route.siteData.role + '/home');
                }
            })
    }

    submitComment() {
        axios.post('/api/createComment', {
            courseId: this.props.params.courseid,
            comment: this.state.createComment
        })
            .then((response) => {
                if (response.data.newComments) {
                    this.state.course.comments = response.data.newComments;
                    this.setState(this.state);
                } else {
                    hashHistory.push(this.props.route.siteData.role + '/home');
                }
            })
    }


    commentInput(event) {
        var str = event.target.value;


        // if this is not true, it only contains whitespace which we dont accept
        if (str.replace(/\s/g, '').length) {
            this.setState({
                submitButtonDisabled: false,
                createComment: event.target.value,
            })
        } else {
            this.setState({
                submitButtonDisabled: true,
                createComment: '',
            })
        }
    }

    rateCourse(value) {
        axios.post('/api/rateCourse', {
            courseId: this.props.params.courseid,
            rating: value
        }).then(function (response) {
            if (response.data.success) this.setState({
                rating: value,
                totalRatingsCallback: response.data.course.totalRatingCount,
                avgRating: response.data.course.ratingAverage,
            });
        }.bind(this));
    }


    followCourse() {
        axios.post('/api/followCourse', {_id: this.props.params.courseid}).then(function (response) {
            if (response.data.success === true) {
                this.setState({
                    followed: true,
                });
            } else if (response.data.success === false) {
                this.setState({
                    errorFollowing: true,
                })
            }
        }.bind(this))
    }

    unFollowCourse() {
        axios.post('/api/unFollowCourse', {_id: this.props.params.courseid}).then(function (response) {
            if (response.data.success === true) {
                this.setState({
                    followed: false,
                })
            } else if (response.data.success === false) {
                this.setState({
                    errorFollowing: true,
                })
            }
        }.bind(this))
    }

    render() {
        let data = this.state.course;
        let siteData = this.props.route.siteData;

        return (
            <div>
                <div className="ViewCourseHeaderContainer">
                    <div className="ViewCourseImageContainer">
                        <img src={data.imgURL} className="ViewCourseImage"/>
                    </div>
                </div>
                <Paper className="paperViewCourseContainer" zDepth={1}>
                    <span className="ViewCourseCourseTitle">{data.title}</span>
                    <div className="ViewCourseTitleAndAuthorEmailContainer">
                        <div>
                            <span className="ViewCourseCourseAuthor">Cursus gemaakt door: {data.author}</span>
                            <br/>
                            <i>
                        <span className="ViewCourseCourseAuthorSmallText">
                            ({data.authorEmail})
                        </span>
                            </i>
                        </div>
                        <div className="FollowButtons">

                            <RaisedButton
                                labelPosition="before"
                                primary={true}
                                label='Naar cursus'
                                className='ViewCourseGoToCourse'
                                href={data.URLToCourse}
                                icon={<NavigationArrowForward/>}
                            />
                            <FlatButton
                                secondary={true}
                                labelPosition="before"
                                label={this.state.errorFollowing ?
                                    'Error met volgen'
                                    :
                                    this.state.followed ?
                                        'Cursus ontvolgen'
                                        :
                                        'Cursus volgen'
                                }
                                onClick={this.state.followed ?
                                    this.unFollowCourse
                                    :
                                    this.followCourse}

                                className={this.state.errorFollowing ?
                                    'errorFollowingButton'
                                    :
                                    this.state.followed ?
                                        'followedFollowingButton'
                                        :
                                        'followButton'
                                }

                                icon={this.state.errorFollowing ?
                                    <AlertErrorOutline/>
                                    :
                                    this.state.followed ?
                                        <ActionBookmark className="whiteIcon"/>
                                        :
                                        <ActionBookmarkBorder/>
                                }
                            />
                            <Rating
                                value={this.state.rating}
                                max={5}
                                onChange={function (value) {
                                    this.rateCourse(value)
                                }.bind(this)}
                            />
                        </div>
                    </div>
                    <Divider style={{marginTop: 10}}/>
                    <br/>
                    <span className="ViewCourseDescription">
                        {data.description}
                    </span>
                </Paper>
                <Paper className="paperViewCourseCommentContainer" zDepth={1}>
                    <div className='mCreateCommentContainer'>
                        <div className='createCommentContainer'>
                            <img src={siteData.displayImage} className='commentUserImage'/>
                            <TextField
                                hintText="Type een comment.."
                                multiLine={true}
                                value={this.state.createComment}
                                rows={2}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                onChange={this.commentInput}
                                rowsMax={4}
                            />
                        </div>
                        <RaisedButton className='createCommentSubmitButton'
                                      labelColor="#ffffff"
                                      primary={true}
                                      disabled={this.state.submitButtonDisabled}
                                      onClick={this.submitComment}
                                      label='Creëer comment'/>
                    </div>

                    <div className="ViewCourseCommentContainer">
                        {this.state.course.comments.map((elem, index) => {
                            return (
                                <Comment siteData={this.props.route.siteData} commentData={elem}
                                         removeComment={this.removeComment} key={index}/>
                            )
                        })}
                    </div>
                </Paper>
            </div>
        )
    }
}