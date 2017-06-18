import React, {Component} from 'react';
import logo from '../images//roc-dev-logo.png';
import {Paper} from "material-ui";
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={1}>
                <div className="StudentHomePageHeader">
                    <div className="StudentHomePageHeaderContent">
                        <img src={logo} className="StudentHomePageContentLogo"/>
                        <span>Welkom bij de thuis pagina van roc-dev.</span>
                    </div>
                </div>
            </Paper>
        )
    }
}