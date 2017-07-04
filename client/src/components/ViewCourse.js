import React, {Component} from 'react';
import axios from 'axios';
import {hashHistory} from 'react-router';
import {Divider, FlatButton, Paper, RaisedButton, Snackbar, TextField} from "material-ui";
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

        let followed = false;
        if (this.props.route.siteData.followedCourses.includes(this.props.params.courseid)) {
            followed = true;
        }

        this.state = {
            course: null,
            followed: followed,
            submitButtonDisabled: true,
            createComment: '',
            toastOpen: false,
        };
        this.commentInput = this.commentInput.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.followCourse = this.followCourse.bind(this);
        this.unFollowCourse = this.unFollowCourse.bind(this);
        this.rateCourse = this.rateCourse.bind(this);
        this.handleToastPopup = this.handleToastPopup.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }


    // TODO add this in production

    componentWillMount() {

        let rating;

        axios.post('/api/getCourse', {
            courseId: this.props.params.courseid,
            token: this.props.route.siteData.token,
            userId: this.props.route.siteData._id,
        }).then((response) => {
            if (response.data.course) {
                response.data.course.allRatingValues.forEach((elem, index) => {
                    if (elem.authorId == this.props.route.siteData._id) {
                        rating = elem.rating;
                    }
                });

                if (response.data.followedCourses && response.data.followedCoursesData) {
                    this.props.route.updateFollowedCourses(response.data.followedCourses, response.data.followedCoursesData);
                    this.setState({
                        course: response.data.course,
                        rating: rating,
                        followed: true,
                    })
                } else {
                    this.setState({
                        course: response.data.course,
                        rating: rating,
                    });
                }
            } else {
                hashHistory.push('/' + this.props.route.siteData.role + '/home');
            }
        })
    }

    removeComment(commentId) {
        axios.post('/api/removeComment', {
            courseId: this.props.params.courseid,
            userId: this.props.route.siteData._id,
            commentId: commentId,
            token: this.props.route.siteData.token,
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
        if (this.state.createComment.length > 254) {
            this.state.createComment = this.state.createComment.substr(0, 254);
        }
        console.log(this.state.createComment);
        axios.post('/api/createComment', {
            courseId: this.props.params.courseid,
            comment: this.state.createComment,
            token: this.props.route.siteData.token,
        })
            .then((response) => {
                if (response.data.newComments) {
                    this.state.course.comments = response.data.newComments;
                    this.state.createComment = '';
                    this.state.submitButtonDisabled = true;
                    this.setState(this.state);
                } else {
                    hashHistory.push(this.props.route.siteData.role + '/home');
                }
            })
    }


    commentInput(event) {
        console.log(`
        
        comment:
        =============
        ${JSON.stringify(this.state.createComment)}
        
        `,);

        if (this.state.createComment.length <= 253) {
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
        } else {
            // this is in case someone copy-pasted a huge lump of text into the comment text area.
            if(this.state.createComment.length >= 254) {
                this.state.createComment = this.state.createComment.substr(0,252);
            }
            this.setState({
                submitButtonDisabled: false,
                createComment: this.state.createComment,
            })
        }

    }

    rateCourse(value) {
        axios.post('/api/rateCourse', {
            courseId: this.props.params.courseid,
            rating: value,
            token: this.props.route.siteData.token,
        }).then(function (response) {
            if (response.data.success) this.setState({
                rating: value,
                totalRatingsCallback: response.data.course.totalRatingCount,
                avgRating: response.data.course.ratingAverage,
            });
        }.bind(this));
    }


    followCourse() {
        axios.post('/api/followCourse', {
            courseId: this.props.params.courseid,
            token: this.props.route.siteData.token,
        }).then(function (response) {
            console.log(response);

            if (response.data.followedCourses) {
                this.props.route.updateFollowedCourses(response.data.followedCourses, response.data.followedCoursesData);
                this.setState({
                    followed: true,
                });
            }
        }.bind(this))
    }

    unFollowCourse() {
        axios.post('/api/unFollowCourse', {
            courseId: this.props.params.courseid,
            token: this.props.route.siteData.token,
        }).then(function (response) {
            console.log(response);
            if (response.data.followedCourses) {
                this.props.route.updateFollowedCourses(response.data.followedCourses, response.data.followedCoursesData);
                this.setState({
                    followed: false,
                })
            }
        }.bind(this))
    }

    handleToastPopup() {
        this.setState({
            toastOpen: true,
        })
    }

    handleRequestClose() {
        this.setState({
            toastOpen: false,
        });
    }


    render() {
        if (this.state.course != null) {
            let data = this.state.course;
            let siteData = this.props.route.siteData;


            console.log(`
            
            
            
            data description viewcourse:
            
            
            `, data.description);

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
                        {/* using dangerouslySetInnerHTML here because JSX is escaping the <> tags */}
                        <span className="ViewCourseDescription" dangerouslySetInnerHTML={{__html: data.description}}>
                    </span>
                    </Paper>
                    <Paper className="paperViewCourseCommentContainer" zDepth={1}>
                        <div className='mCreateCommentContainer'>
                            <div className='createCommentContainer'>
                                <img src={siteData.displayImage} className='commentUserImage'/>
                                <TextField
                                    floatingLabelText='Type een comment'
                                    multiLine={true}
                                    value={this.state.createComment}
                                    rows={1}
                                    floatingLabelFocusStyle={styles.floatingLabelStyle}
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
                                          label='Plaats comment'/>
                        </div>

                        <div className="ViewCourseCommentContainer">
                            {this.state.course.comments.map((elem, index) => {
                                return (
                                    <Comment siteData={this.props.route.siteData} commentData={elem} authorId={data.authorId}
                                             removeComment={this.removeComment} handleToastPopup={this.handleToastPopup} key={index}/>
                                )
                            })}
                        </div>
                    </Paper>
                    <Snackbar
                        open={this.state.toastOpen}
                        message={"Stuur je mail naar: " + data.authorEmail}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}