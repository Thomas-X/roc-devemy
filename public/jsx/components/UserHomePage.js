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
            success: null,
            isEmpty: null,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setState({
            data: [],
            loaded: false,
            success: true,
            isEmpty: true,
        })
        console.log('after setState');

        var init = {
            method: 'GET',
            cache: false
        }

        fetch('/api/getCourseDataById', init).then((response) => response.json().then(function (responseCourseData){
            //we get a return of course by user from the server API
            //we get a return of course by user from the server API
            console.log('in get');

            try {

                var success = responseCourseData.success;

                var length = responseCourseData.courses.length;

                if (success && length > 0 && length != null) {
                    var courses = JSON.parse(responseCourseData.data).courses

                    for (var o = 0; o < courses.length; o++) {
                        this.state.data.push(courses[o]);
                    }

                    this.setState({
                        loaded: true,
                        success: true,
                        isEmpty: false,
                    })


                } else if (!success && length <= 0) {
                    this.setState({
                        success: false,
                        loaded: false,
                        isEmpty: true,
                    })
                }

                console.log('FETCHED DATA: ',responseCourseData);
            } catch(err) {
                // do nothing because this error happens when user is either not authenticated or
                // there is an actual error (lets hope not)
                console.l
            }
            console.log('end of function');

        }.bind(this)
        ))};

    render() {

        return (
            <div style={styles.userhomepage}>
                <Divider style={styles.userhomepagedivider}/>
                <div>
                    {this.state.loaded ?
                        <div>
                            {this.state.data.map(function (courseItem, index) {
                                return (
                                    <div key={index}>
                                        <h2>Verder kijken</h2>
                                        <CourseItem courseData={courseItem}/>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div>
                            {this.state.isEmpty ?
                                <h3 style={{fontWeight: 300}}>Je volgt nog geen cursussen, zoek of vraag naar een
                                    link van de leraar om er een te
                                    volgen.</h3>
                                :
                                this.state.success ?
                                    <CircularProgress size={80} thickness={5}/>
                                    :
                                    <h3 style={{fontWeight: 300}}>Je volgt nog geen cursussen, zoek of vraag naar een
                                        link van de leraar om er een te
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
            <Card style={styles.card}>
                <IndexLink to={'/courses/' + this.props.courseData._id} style={styles.cardIndexLink}>
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
                </IndexLink>
            </Card>
        )
    }
}
CourseItem.propTypes = {
    courseData: PropTypes.object
}