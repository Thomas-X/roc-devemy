import React, {Component} from 'react';
import axios from 'axios';
import * as styles from '../styles';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {CircularProgress, Divider} from "material-ui";
import ActionHome from 'material-ui/svg-icons/action/home';
import {IndexLink} from "react-router";

import CourseItem from './CourseItem';

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

        var config = {
            headers: {'cache-control': 'no-cache'}
        };

        axios.get('/api/getCourseDataById', config)
                .then(function (responseJson) {
                responseJson = JSON.parse(responseJson['data']);

                var success = responseJson.success;
                if (responseJson.courses != null) {
                    var length = responseJson.courses.length;
                }
                if (success && length > 0 && length != null) {
                    var courses = responseJson.courses

                    for (var o = 0; o < courses.length; o++) {
                        this.state.data.push(courses[o]);
                    }
                    this.state.loaded = true;
                    this.state.success = true;
                    this.state.isEmpty = false;
                    this.setState(this.state);
                } else if (!success && length <= 0) {
                    this.state.success = false;
                    this.state.loaded = false;
                    this.state.isEmpty = true;
                    this.setState(this.state);
                }
            }.bind(this))
    };

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

