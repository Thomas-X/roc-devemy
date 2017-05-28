import React from 'react';
import LoggedIn from './LoggedIn';
import Login from './Login';
import {AppBar, Avatar, Drawer, FlatButton, List, ListItem, MenuItem, Divider, Subheader, TextField} from "material-ui";
import * as styles from '../styles';
import axios from 'axios';
import {IndexLink} from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import CoursesList from './CoursesList';
import {ActionSearch} from "material-ui/svg-icons/index";

export default class NavigationAndDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            loggedIn: false,
            username: '',
            email: '',
            displayImage: '',
            isTeacher: null,
        };
        // if using a method instead the render function here don't forget to call
        // this.{methodName} = this.{methodName}.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.drawerActivated = this.drawerActivated.bind(this);
    }

    drawerActivated() {
        this.setState({
                drawerOpen: !this.state.drawerOpen
            }
        )
    }

    handleChange(value) {
        this.state.slideIndex = value;
        this.setState(this.state);
    };

    componentDidMount() {

        axios.get('/api/getUserData')
            .then(function (responseJson) {
                responseJson = JSON.parse(responseJson['data']);


                // since it's false by default
                if (responseJson.loggedIn == true) {
                    this.state.loggedIn = true;
                    this.state.username = responseJson.username;
                    this.state.isTeacher = responseJson.isTeacher,
                        this.state.email = responseJson.email;
                    this.state.displayImage = responseJson.displayImage;
                    this.setState(this.state);
                }
            }.bind(this))
    }


    render() {
        return (
            <div>
                <AppBar title=''
                        onLeftIconButtonTouchTap={this.drawerActivated}
                        iconElementRight={this.state.loggedIn ?
                            <LoggedIn displayImage={this.state.displayImage} isTeacher={this.state.isTeacher}
                                      username={this.state.username}/> :
                            <Login/>}
                        iconStyleRight={styles.appbarUserAvatarAndImage}
                        style={styles.appbarFixed}
                />
                <Drawer
                    open={this.state.drawerOpen}
                    docked={false}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
                    children={
                        <div>
                            {this.state.loggedIn
                                ?
                                <div>
                                    <IndexLink style={styles.drawerLogoContainer} to="/">
                                        <h1 id='drawer-logo' style={styles.drawerLogoh1}>roc-dev</h1>
                                    </IndexLink>
                                    <MenuItem leftIcon={<ActionHome/>}>Homepage</MenuItem>
                                    <CoursesList/>
                                    <Divider/>
                                    <Subheader>Resources</Subheader>
                                    <a href="https://github.com/">
                                        <MenuItem
                                            leftIcon={<i className="fa fa-github" style={styles.githubIconDrawer}/>}>GitHub</MenuItem>
                                    </a>
                                </div>
                                :
                                <div>
                                    <IndexLink style={styles.drawerLogoContainer} to="/">
                                        <h1 id='drawer-logo' style={styles.drawerLogoh1}>roc-dev</h1>
                                    </IndexLink>
                                    <IndexLink to="/about/author">
                                        <MenuItem>About this site</MenuItem>
                                    </IndexLink>
                                </div>
                            }
                        </div>
                    }>
                </Drawer>
            </div>
        )
    }
}