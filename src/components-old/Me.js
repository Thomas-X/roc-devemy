import React from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import * as styles from '../styles';

export default class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: null,
            authenticated: true,
            finishedCoursesData: null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/getUserProfile').then(function (responseJson) {

            console.log(responseJson);


            var auth = JSON.parse(responseJson['data']).Authenticated


            if (!auth) {
                this.state.authenticated = false;
            } else if (auth) {
                this.state.authenticated = true;
                this.state.loaded = true;
                this.state.data =  JSON.parse(responseJson['data']).data;

                this.state.finishedCoursesData = JSON.parse(responseJson['data']).finishedCoursesData;
            }
            this.setState(this.state);
        }.bind(this));
    }


    render() {
        return (
            <div>
                {this.state.loaded ? <UserProfile userdata={this.state.data} finishedCoursesData={this.state.finishedCoursesData}/> :
                    <CircularLoader isAuthenticated={this.state.authenticated}/>}
            </div>
        )
    }
}

class CircularLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='circularLoader'>
                {this.props.isAuthenticated ? <CircularProgress size={80} thickness={5} className='circularLoader'/> :
                    <h1>Please log in before trying to check your profile.</h1>}
            </div>
        )
    }
}
CircularLoader.propTypes = {
    isAuthenticated: PropTypes.bool,
}
