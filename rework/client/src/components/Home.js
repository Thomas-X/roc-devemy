import React, {Component} from 'react';
import { hashHistory } from 'react-router';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.redirectUser = this.redirectUser.bind(this);

    }

    componentWillMount() {
        this.redirectUser();
    }

    redirectUser() {
        let data = this.props.route.siteData;
        if (data.role == "teacher") {
            hashHistory.push('/teacher/home');
        } else if (data.role == "student") {
            hashHistory.push('/student/home');
        }
    }

    render() {
        return (
            <div>
                home
            </div>
        )
    }
}