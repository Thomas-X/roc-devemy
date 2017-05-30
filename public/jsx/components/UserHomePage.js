import React, {Component} from 'react';
import axios from 'axios';
import * as styles from '../styles';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {CircularProgress, Divider} from "material-ui";
import ActionHome from 'material-ui/svg-icons/action/home';
import {IndexLink} from "react-router";

export default class UserHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: null,
            success: null
        }

    }

    componentDidUpdate() {
        console.log('i liev!!!');
        axios.get('/api/getCourseDataById').then(function (responseCourseData) {
            //we get a return of course by user from the server API
            //we get a return of course by user from the server API

            var success = JSON.parse(responseCourseData.data).success

            var length = JSON.parse(responseCourseData.data).courses.length;

            if (success && length > 0) {
                var courses = JSON.parse(responseCourseData.data).courses


                this.setState({
                    loaded: true,
                    success: true,
                    data: [],
                })

                for (var o = 0; o < courses.length; o++) {
                    this.state.data.push(courses[o]);
                }
            } else if (!success && length <= 0) {
                this.setState({
                    success: false,
                    loaded: false,
                })
            }
        }.bind(this));
    }

    componentDidMount() {
        axios.get('/api/getCourseDataById').then(function (responseCourseData) {
            //we get a return of course by user from the server API
            //we get a return of course by user from the server API

            var success = JSON.parse(responseCourseData.data).success

            var length = JSON.parse(responseCourseData.data).courses.length;

            if (success && length > 0) {
                var courses = JSON.parse(responseCourseData.data).courses


                this.setState({
                    loaded: true,
                    success: true,
                })

                for (var o = 0; o < courses.length; o++) {
                    this.state.data.push(courses[o]);
                }
            } else if (!success && length <= 0) {
                this.setState({
                    success: false,
                    loaded: false,
                })
            }
        }.bind(this));
    };

    render() {

        return (
            <div style={styles.userhomepage}>
                <h2>Verder kijken</h2>
                <Divider style={styles.userhomepagedivider}/>
                <div>
                    {this.state.loaded ?
                        <div>
                            {this.state.data.map(function (courseItem, index) {
                                return (
                                    <CourseItem key={index} courseData={courseItem}/>
                                )
                            })}
                        </div>
                        :
                        <div>
                            {this.state.success ?
                                <CircularProgress size={80} thickness={5}/>
                                :
                                <h3 style={{fontWeight: 300}}>Je volgt nog geen cursussen, zoek of vraag naar een link van de leraar om er een te
                                    volgen.</h3>
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

class CourseItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <IndexLink to={'/courses/' + this.props.courseData._id} style={styles.cardIndexLink}>
                <Card style={styles.card}>
                    <CardMedia
                        overlay={
                            <div style={styles.cardTitleContainer}>
                                <CardTitle
                                    titleStyle={styles.cardTitleStyle}
                                    subtitleStyle={styles.cardSubtitleStyle}
                                    title={this.props.courseData.title}
                                    subtitle={this.props.courseData.author}/>
                            </div>
                        }>
                        <img src={this.props.courseData.imgURL} style={styles.cardImage}/>
                    </CardMedia>
                </Card>
            </IndexLink>
        )
    }
}
CourseItem.propTypes = {
    courseData: PropTypes.object
}