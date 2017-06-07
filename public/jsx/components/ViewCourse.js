import React, {Component} from 'react';
import {CircularProgress, Divider, FlatButton, Paper, RaisedButton} from "material-ui";
import * as styles from "../styles";
import axios from 'axios';
import {
    ActionBookmark, ActionBookmarkBorder, AlertErrorOutline, HardwareKeyboardArrowRight,
    NavigationArrowForward
} from "material-ui/svg-icons/index";
import {Rating} from 'material-ui-rating'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Comment from './Comment';
import CreateComment from './CreateComment';

export default class ViewCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: null,
            loaded: false,
            followed: false,
            errorFollowing: false,
            rating: 0,
            totalRatingsCallback: null,
            avgRating: null,
            userImage: null,
            author: null,

        }
        this.followCourse = this.followCourse.bind(this);
        this.unFollowCourse = this.unFollowCourse.bind(this);

        this.rateCourse = this.rateCourse.bind(this);
        this.newComment = this.newComment.bind(this);

        this.deleteComment = this.deleteComment.bind(this);
    }


    componentDidMount() {
        axios.post('/api/getCourseById', {_id: this.props.params.courseid}).then(function (response) {
            if (response != null) this.setState({
                course: response.data.course,
                totalRatingsCallback: response.data.course.totalRatingCount,
                avgRating: response.data.course.ratingAverage,
                userImage: response.data.userImage,
                userId: response.data.userId,
                author: response.data.author,
            });

            axios.get('/api/getFollowedCourses').then(function (response2) {

                if (response2.data.success === true) {
                    var followedCourses = response2.data.followedCourses;

                    if (followedCourses.length > 0) {
                        followedCourses.forEach(function (elem) {
                            if (elem == this.props.params.courseid) {
                                this.setState(
                                    {
                                        followed: true,
                                        loaded: true,
                                    })
                            }
                        }.bind(this))
                    } else if (followedCourses.length <= 0) {
                        this.setState({
                            loaded: true,
                            followed: false,
                        })
                    }
                }

            }.bind(this))
        }.bind(this))

    }

    newComment(comments) {
        this.state.course.comments = comments;
        this.setState(this.state);
    }

    deleteComment(courseId, userId, _id) {

        axios.post('/api/deleteComment/', {courseId: courseId,_id: _id, userId: userId}).then((responseJson) => {
            if(responseJson.data.success === true) {
            }
        });

    }

    rateCourse(value) {
        axios.post('/api/rateCourse', {courseId: this.props.params.courseid, rating: value}).then(function (response) {
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
        if (this.state.course != null) {
            var course = this.state.course;
        }
        return (
            <div>
                {this.state.loaded ?
                    <div>
                        <div style={styles.ViewCourseFullWidthHeader}>
                            <div style={styles.ViewCourseFullWidthContainer}>
                                <h2 style={styles.ViewCourseFullWidthTitle}>{course.title}</h2>
                                <h3 style={styles.ViewCourseFullWidthAuthor}><i>Door: {course.author}</i></h3>
                            </div>
                        </div>
                        <Paper style={styles.paperEditorContent} zDepth={1}>
                            <div style={styles.ViewCourseContent}>
                                <h1>Description</h1>
                                <div style={styles.ViewCourseNavigation}>
                                    <RaisedButton
                                        labelPosition="before"
                                        primary={true}
                                        label='Naar cursus'
                                        style={styles.ViewCourseGoToCourse}
                                        href={course.URLToCourse}
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

                                        style={this.state.errorFollowing ?
                                            styles.errorFollowingButton
                                            :
                                            this.state.followed ?
                                                styles.followedFollowingButton
                                                :
                                                null
                                        }
                                        icon={this.state.errorFollowing ?
                                            <AlertErrorOutline/>
                                            :
                                            this.state.followed ?
                                                <ActionBookmark/>
                                                :
                                                <ActionBookmarkBorder/>
                                        }
                                    />
                                </div>

                                <Divider style={styles.ViewCourseDivider}/>
                                <ReactCSSTransitionGroup
                                    transitionName="example"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}>
                                    <span key={1}> total ratings: {this.state.totalRatingsCallback}</span>
                                    <br key={2}/>
                                    <span key={3}>average rating: {this.state.avgRating}</span>
                                </ReactCSSTransitionGroup>
                                <Rating
                                    value={this.state.rating}
                                    max={5}
                                    onChange={function (value) {
                                        this.rateCourse(value)
                                    }.bind(this)}
                                />
                                <p>
                                    {course.description}
                                </p>
                            </div>
                        </Paper>
                        <Paper style={styles.commentContentContainer} zDepth={1}>
                            img: {this.state.userImage}
                            id: {this.state.userId}
                            <CreateComment
                                userImage={this.state.userImage}
                                userId={this.state.userId}
                                commentCreated={this.newComment}
                                author={this.state.author}
                                courseId={this.props.params.courseid}/>

                            <ReactCSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>
                                {this.state.course.comments.map((elem, index) => {
                                    console.log(elem);
                                    return (
                                        <Comment key={index} comment={elem} userId={this.state.userId} removeComment={() => {
                                            this.deleteComment(this.props.params.courseid, this.state.userId, elem._id)
                                        }}
                                        />
                                    )
                                })}
                            </ReactCSSTransitionGroup>
                        </Paper>
                    </div>
                    :
                    <CircularProgress size={80} thickness={5}/>
                }
            </div>
        )
    }
}


