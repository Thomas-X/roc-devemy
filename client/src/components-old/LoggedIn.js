import React from 'react';
import {
    Avatar, Divider, Drawer, FlatButton, IconButton, List, ListItem, Menu, MenuItem,
    Popover
} from "material-ui";
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import Input from 'material-ui/svg-icons/action/input';
import * as styles from '../styles';
import {muiTheme, customTheme} from '../customMuiTheme';
import PropTypes from 'prop-types';

import {IndexLink, Link} from 'react-router';
import {ContentAdd, ActionPermMedia, ActionSearch} from "material-ui/svg-icons/index";


export default class LoggedIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }


    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    render() {
        return (
    <div>

    </div>
        )
    }
}

export class MePopoverAppbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <IndexLink activeClassName='active' to='/about/me'><MenuItem primaryText={this.props.username}
                                                                         leftIcon={<PersonOutline/>}/></IndexLink>
        )
    }
}
export class NewCoursePopoverAppbar extends React.Component {
    render() {
        return (
            <IndexLink activeClassName="active" to="/courses/createCourse/"><MenuItem primaryText='New course'
                                                                                      leftIcon={
                                                                                          <ContentAdd/>}/></IndexLink>
        )
    }
}
export class MyCoursesPopOverAppbar extends React.Component {
    render() {
        return (
            <IndexLink activeClassName="active" to="/about/me/mycourses"><MenuItem primaryText='My courses' leftIcon={
                <ActionPermMedia/>}/></IndexLink>
        )
    }
}
MePopoverAppbar.propTypes = {
    username: PropTypes.string,
}

LoggedIn.propTypes = {
    displayImage: PropTypes.string,
    username: PropTypes.string,
}