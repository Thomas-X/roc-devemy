import React from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import UserHomePage from './UserHomePage';

export default class NotLoggedInHomepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,

        }
    }

    componentDidMount() {

        var config = {
            headers: {'cache-control': 'no-cache'}
        };

        axios.get('http://localhost:5000/api/loggedIn', config).then(function (responseJson) {

            var auth = JSON.parse(responseJson['data']).Authenticated

            console.log(responseJson, auth);

            if (!auth) {
                this.setState({authenticated: false})
            } else if (auth) {

                this.setState({authenticated: true})
            }
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