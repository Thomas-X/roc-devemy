/**
 * Created by Thomas on 6/18/2017.
 */

import React, {Component} from 'react';
import {
    AppBar, Avatar, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem, Popover,
    Subheader
} from "material-ui";
import {IndexLink} from "react-router";
import {
    ActionHome, ActionPermMedia, ActionSearch, ContentAdd, ActionInput, SocialPersonOutline, ActionFace,
    ActionChromeReaderMode, ActionAccountBox
} from "material-ui/svg-icons/index";
import {customTheme} from "../customMuiTheme";
import cookie from 'react-cookies';


export default class NavigationAndDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false,
            open: false,
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.drawerActivated = this.drawerActivated.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);

    }

    drawerActivated() {
        this.setState({
                drawerOpen: !this.state.drawerOpen
            }
        )
    }

    handleTouchTap(event) {
        // This prevents ghost click on android devices
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

    handleSignOut() {

        try {
            const CookieRemoved = async () => cookie.remove('token', {path: '/'});
            CookieRemoved().then(() => {
                window.location.href = "http://localhost:5002/";
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        return (
            <div>
                <AppBar title=''
                        onLeftIconButtonTouchTap={this.drawerActivated}
                        children={
                            <div className='appBarContainer'>
                                <IndexLink to="/student/search" className='appbarSearch'>
                                    <IconButton tooltip="Zoek naar een cursus" className='whiteText'>
                                        <ActionSearch className="searchButtonNavbar"/>
                                    </IconButton>
                                </IndexLink>
                                <List
                                    className='appbarUserAvatarAndImage2'>
                                    <ListItem
                                        leftAvatar={
                                            <Avatar
                                                src={this.props.siteData.displayImage}
                                            />
                                        }
                                        color={customTheme.alternateTextColor}
                                        className='whiteText'
                                        onTouchTap={this.handleTouchTap}
                                    >
                                        {this.props.siteData.displayName}
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
                                            <MePopoverAppbar username={this.props.siteData.displayName}/>
                                            {this.props.siteData.isTeacher ?
                                                <div>
                                                    <NewCoursePopoverAppbar/>
                                                    <MyCoursesPopOverAppbar/>
                                                    <ToStudentArea/>
                                                </div> : null
                                            }
                                            <Divider/>
                                            <a onClick={this.handleSignOut}><MenuItem primaryText="Uitloggen"
                                                                                      leftIcon={<ActionInput/>}/></a>
                                        </Menu>
                                    </Popover>
                                </List>
                            </div>
                        }
                        className='appbarFixed'
                />
                <Drawer
                    open={this.state.drawerOpen}
                    docked={false}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
                    children={
                        <div className="NavigationAndDrawerDrawerContainer">
                            <div>
                                <IndexLink className='drawerLogoContainer'
                                           to={"/" + this.props.siteData.role + '/home'}>
                                    <h1 id='drawer-logo' className='drawerLogoh1'>roc-dev</h1>
                                </IndexLink>
                                <IndexLink to={"/" + this.props.siteData.role + '/home'}>
                                    <MenuItem leftIcon={<ActionHome/>}>
                                        Thuispagina
                                    </MenuItem>
                                </IndexLink>
                                {this.props.siteData.isTeacher ?
                                    <div>
                                        <NewCoursePopoverAppbar/>
                                        <MyCoursesPopOverAppbar/>
                                        <IndexLink to="/student/home/">
                                            <MenuItem primaryText='Naar studentenpagina' leftIcon={<ActionFace/>}/>
                                        </IndexLink>
                                    </div> : null
                                }
                                <a onClick={this.handleSignOut}><MenuItem primaryText="Uitloggen"
                                                                          leftIcon={<ActionInput/>}/></a>
                                <Divider/>
                                <Subheader>Nuttige links</Subheader>
                                <a href="https://classroom.google.com">
                                    <MenuItem
                                        leftIcon={<ActionAccountBox
                                            id='githubIconDrawer'/>}>Classroom</MenuItem>
                                </a>
                                <a href="https://github.com/">
                                    <MenuItem
                                        leftIcon={<i className="fa fa-github" id='githubIconDrawer'/>}>GitHub</MenuItem>
                                </a>
                                <a href="https://sites.google.com/site/mediavormgeven/">
                                    <MenuItem
                                        leftIcon={<ActionChromeReaderMode id='githubIconDrawer'/>}>BPV site</MenuItem>
                                </a>

                            </div>
                            <div className="NavigationAndDrawerDrawerFooter">
                                <span className="NavigationAndDrawerDrawerFooterTitle">Made with ❤ by <a href="https://github.com/Thomas-X/">Thomas Zwarts</a> </span>
                                <span className="NavigationAndDrawerFooterSubText">
                                    <i>(And React + NodeJS)</i>
                                </span>
                            </div>
                        </div>
                    }>
                </Drawer>
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
            <IndexLink activeClassName='active' to='/student/home/me/'><MenuItem primaryText={this.props.username}
                                                                                 leftIcon={
                                                                                     <SocialPersonOutline/>}/></IndexLink>
        )
    }
}
export class NewCoursePopoverAppbar extends React.Component {
    render() {
        return (
            <IndexLink activeClassName="active" to="/teacher/home/createCourse"><MenuItem primaryText='Nieuwe cursus'
                                                                                          leftIcon={
                                                                                              <ContentAdd/>}/></IndexLink>
        )
    }
}
export class MyCoursesPopOverAppbar extends React.Component {
    render() {
        return (
            <IndexLink activeClassName="active" to="/teacher/home/"><MenuItem primaryText='Mijn cursussen' leftIcon={
                <ActionPermMedia/>}/></IndexLink>
        )
    }
}
export class ToStudentArea extends React.Component {
    render() {
        return (
            <IndexLink to="/student/home/">
                <MenuItem primaryText='Naar student thuispagina' leftIcon={<ActionFace/>}/>
            </IndexLink>
        )
    }
}