import React from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import UserHomePage from './UserHomePage';

export default class NotLoggedInHomepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: true,

        }
    }

    componentDidMount() {
        axios.get('/api/loggedIn').then(function (responseJson) {

            var auth = JSON.parse(responseJson['data']).Authenticated

            if (!auth) {
                this.state.authenticated = false
            } else if (auth) {
                this.state.authenticated = true;
            }
            this.setState(this.state);
        }.bind(this));
    }


    render() {
        return (
            <div>
                {this.state.authenticated ? <UserHomePage/> :
                    <HomePage/>}
            </div>
        )
    }
}