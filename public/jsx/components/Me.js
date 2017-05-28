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
        }
    }

    componentDidMount() {
        axios.get('/api/getUserProfile').then(function (responseJson) {

            var auth = JSON.parse(responseJson['data']).Authenticated

            if(!auth) {
                this.state.authenticated = false
            } else if(auth) {
                responseJson = JSON.parse(responseJson['data']).data;
                this.state.authenticated = true,
                    this.state.loaded = true;
                this.state.data = responseJson;
            }
            this.setState(this.state);
        }.bind(this));
    }


    render() {
        return (
            <div>
                {this.state.loaded ? <UserProfile userdata={this.state.data}/> : <CircularLoader isAuthenticated={this.state.authenticated}/>}
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
            <div style={styles.circularLoader}>
                {this.props.isAuthenticated ? <CircularProgress size={80} thickness={5}/> : <h1>Please log in before trying to check your profile.</h1>}
            </div>
        )
    }
}
CircularLoader.propTypes = {
    isAuthenticated: PropTypes.bool,
}
