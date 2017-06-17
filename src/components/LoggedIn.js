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
        let isTeacher = false
        console.log(this.props.role);
        if (this.props.role == 'teacher') {
            isTeacher = true;
        }

        return (
            <div className='appBarContainer'>
                <IndexLink to="/search" className='appbarSearch'>
                    <IconButton tooltip="Zoek naar een cursus" className='whiteText'>
                        <ActionSearch className="searchButtonNavbar"/>
                    </IconButton>
                </IndexLink>
                <List
                    className='appbarUserAvatarAndImage2'>
                    <ListItem
                        leftAvatar={
                            <Avatar
                                src={this.props.displayImage}
                            />
                        }
                        color={customTheme.alternateTextColor}
                        className='whiteText'
                        onTouchTap={this.handleTouchTap}
                    >
                        {this.props.username}
                    </ListItem>

                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose}
                        canAutoPosition={true}
                    >
                        <Menu>
                            <MePopoverAppbar username={this.props.username}/>
                            {isTeacher
                                ?
                                <div>
                                    <NewCoursePopoverAppbar/>
                                    <MyCoursesPopOverAppbar/>
                                </div>
                                :
                                null
                            }
                            <Divider/>
                            <a href="http://localhost:5000/logout"><MenuItem primaryText="Sign out"
                                                                                       leftIcon={<Input/>}/></a>
                        </Menu>
                    </Popover>
                </List>
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