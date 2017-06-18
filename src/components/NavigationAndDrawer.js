/**
 * Created by Thomas on 6/18/2017.
 */

import React, {Component} from 'react';
import {
    AppBar, Avatar, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem, Popover,
    Subheader
} from "material-ui";
import {IndexLink} from "react-router";
import {ActionHome, ActionPermMedia, ActionSearch, ContentAdd, ActionInput, SocialPersonOutline} from "material-ui/svg-icons/index";
import {customTheme} from "../customMuiTheme";


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

    render() {

        return (
            <div>
                <AppBar title=''
                        onLeftIconButtonTouchTap={this.drawerActivated}
                        children={
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
                                                </div> : null
                                            }
                                            <Divider/>
                                            <a href="http://localhost:5000/logout"><MenuItem primaryText="Sign out"
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
                        <div>
                            <div>
                                <IndexLink className='drawerLogoContainer' to="/">
                                    <h1 id='drawer-logo' className='drawerLogoh1'>roc-dev</h1>
                                </IndexLink>
                                <IndexLink to="/">
                                    <MenuItem leftIcon={<ActionHome/>}>
                                        Thuispagina
                                    </MenuItem>
                                </IndexLink>
                                <Divider/>
                                <Subheader>Resources</Subheader>
                                <a href="https://github.com/">
                                    <MenuItem
                                        leftIcon={<i className="fa fa-github" id='githubIconDrawer'/>}>GitHub</MenuItem>
                                </a>
                                <a href="https://google.com/">
                                    <MenuItem
                                        leftIcon={<i className="fa fa-google" id='githubIconDrawer'/>}>Google</MenuItem>
                                </a>
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
            <IndexLink activeClassName='active' to='/about/me'><MenuItem primaryText={this.props.username}
                                                                         leftIcon={<SocialPersonOutline/>}/></IndexLink>
        )
    }
}
export class NewCoursePopoverAppbar extends React.Component {
    render() {
        return (
            <IndexLink activeClassName="active" to="/courses/createCourse/"><MenuItem primaryText='Nieuwe cursus'
                                                                                      leftIcon={
                                                                                          <ContentAdd/>}/></IndexLink>
        )
    }
}
export class MyCoursesPopOverAppbar extends React.Component {
    render() {
        return (
            <IndexLink activeClassName="active" to="/about/me/mycourses"><MenuItem primaryText='Mijn cursussen' leftIcon={
                <ActionPermMedia/>}/></IndexLink>
        )
    }
}