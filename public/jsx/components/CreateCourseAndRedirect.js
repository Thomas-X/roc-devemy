import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import axios from 'axios';

export default class CreateCourseAndRedirect extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/api/createCourse').then(function (responseJson) {
            if (!responseJson.data.userNotValid) {
                hashHistory.push('/courses/editor/' + responseJson.data);
            } else {
                hashHistory.push('/');
            }
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h1>Redirecting..</h1>
            </div>
        )
    }
}