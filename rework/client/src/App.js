import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import {muiTheme, customTheme} from './customMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as styles from './styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import axios from 'axios';
import {CircularProgress} from "material-ui";
import cookie from 'react-cookies'
import StudentHome from "./components/StudentHome";
import NavigationAndDrawer from "./components/NavigationAndDrawer";
import Search from "./components/Search";
import TeacherHome from "./components/TeacherHome";
import CreateCourse from "./components/CreateCourse";
import AboutMe from "./components/AboutMe";
import ViewCourse from "./components/ViewCourse";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import EditCourse from "./components/EditCourse";
import TeacherBoardPage from "./components/TeacherBoardPage";

injectTapEventPlugin();

function gup(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

class App extends Component {
    constructor(props) {
        super(props);


        this.state = {
            siteData: {
                role: "guest",
                token: null,
            }
        }


        this.createCourseUpdateState = this.createCourseUpdateState.bind(this);
        this.removeCourseUpdateState = this.removeCourseUpdateState.bind(this);
        this.saveEditCourseUpdateState = this.saveEditCourseUpdateState.bind(this);
    }

    componentWillMount() {


        let Cookie;


        Cookie = cookie.loadAll();

        let token = Cookie.token;

        this.setState({
            siteData: {
                token: token,
            },
        });


        // this means a cookie is set, but the user has logged in with a different user than
        // the cookie says
        let getUrlParam = gup("token");
        if (getUrlParam != null && Cookie.token != null && this.state.siteData.token != null && getUrlParam != Cookie.token) {
            cookie.remove('token', {path: '/'});
            token = null;
        }

        // this means the cookie was set but there was a login token for some reason
        if (Cookie.token == getUrlParam) {
            window.location.href = removeURLParameter(window.location.href, "token");
        }


        // this means the cookie wasn't loaded properly or just simply doesn't exist
        if (token == null) {


            token = gup('token');

            if (token != null) {

                const CookieSaved = async () => cookie.save('token', token, {
                    path: '/',
                    maxAge: 1209600
                });
                CookieSaved().then(() => {
                    window.location.href = removeURLParameter(window.location.href, "token");
                })
            } else {
                window.location.href = "http://localhost:4000/";
            }
        }

        const doRequest = (token) => {
            axios.post('/api/getUserData', {token: token}).then((response) => {
                console.log(`got response from api`, response);
                if (response.data) {

                    this.setState({
                        siteData: response.data
                    })
                } else {
                    hashHistory.push('/errorwedontknowwhathappened');
                }
                console.log(response.data.siteData, response);
            })
        }

        let CheckCookie = cookie.loadAll();

        if (this.state.siteData.token != null) {
            doRequest(this.state.siteData.token);
        }
        if (CheckCookie.token != null) {
            doRequest(CheckCookie.token);
        }

        if (this.state.siteData.token == null && CheckCookie.token == null) {

            // ref back to server since no cookie is set AND no token in url,
            // otherwise it would have been set in componentWillMount()
            window.location.href = "http://localhost:4000";
        }
    }

    createCourseUpdateState(course) {
        this.setState({
            siteData: {
                ownedData: this.state.siteData.ownedData.push(course)
            }
        })
    }

    removeCourseUpdateState(courseId) {

        let data = this.state.siteData;
        if (data.followedCourses.includes(courseId)) {
            this.setState({
                siteData: {
                    followedCourses: data.followedCourses.splice(data.followedCourses.indexOf(courseId), 1)
                }
            })
        }
        data.finishedCourses.forEach((elem, index) => {
            if (elem._id == courseId) {
                this.setState({
                    siteData: {
                        finishedCourses: data.finishedCourses.splice(index, 1)
                    }
                })
            }
        })
        data.ownedData.forEach((elem, index) => {
            if (elem._id == courseId) {
                data.ownedData.splice(index, 1)
                this.setState(this.state);
            }
        })

    }

    saveEditCourseUpdateState(updatedCourse) {
        let data = this.state.siteData;

        data.ownedData.forEach((elem, index) => {
            if (elem._id == updatedCourse._id) {
                console.log(updatedCourse);
                this.state.siteData.ownedData[index] = updatedCourse;
                console.log(this.state.siteData.ownedData[index]);
                this.setState(this.state);
            }
        });
    }


    render() {


        console.log(`Here is our state:`, this.state, this.state.siteData);
        if (this.state.siteData.role != null && this.state.siteData.role == "teacher" || this.state.siteData.role == "student") {
            console.log('LOADING SITE');


            let data = this.state.siteData.siteData;
            console.log(data);

            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Router history={hashHistory}>
                        <Route path="/" component={Home} siteData={this.state.siteData}/>

                        <Route path="/guest/home" component={Home2} siteData={this.state.siteData}/>

                        <Route path="/teacher" component={TeacherContainer} siteData={this.state.siteData}>
                            <Route path="/teacher/home"
                                   component={TeacherHome}
                                   siteData={this.state.siteData}
                                   removeCourseUpdateState={this.removeCourseUpdateState}/>
                            <Route path="/teacher/home/createCourse"
                                   component={CreateCourse}
                                   siteData={this.state.siteData}
                                   createCourse={this.createCourseUpdateState}/>
                            <Route path="/teacher/home/editCourse/:courseid"
                                   siteData={this.state.siteData}
                                   saveEditCourseUpdateState={this.saveEditCourseUpdateState}
                                   component={EditCourse}/>
                            <Route path="/teacher/home/courseStudents/:courseid"
                                   siteData={this.state.siteData}
                                   component={TeacherBoardPage}
                            />
                            <Route path="/teacher/home/me" component={AboutMe} siteData={this.state.siteData}/>
                        </Route>
                        <Route path="/student" component={StudentContainer} siteData={this.state.siteData}>
                            <Route path="/student/home" component={StudentHome} siteData={this.state.siteData}/>
                            <Route path="/student/search" component={Search} siteData={this.state.siteData}/>
                            <Route path="/student/home/course/:courseid" component={ViewCourse}
                                   siteData={this.state.siteData}/>
                        </Route>

                    </Router>
                </MuiThemeProvider>
            )
        } else {
            console.log('LOADING LOADER')
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="loaderCenterContainer">
                        <CircularProgress size={80} thickness={5} className='circularLoader'/>
                    </div>
                </MuiThemeProvider>
            )
        }
    }
}

// this class is here so if the user get's redirected with siteData.role + '/home' when he's not logged in
class Home2 extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.route.siteData.role == "teacher") {
            hashHistory.push('/teacher/home');
        } else if (this.props.route.siteData.role == "student") {
            hashHistory.push('/student/home');
        } else {
            hashHistory.push('/');
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
class TeacherContainer extends React.Component {
    constructor(props) {
        super(props);


    }

    componentWillMount() {
        let data = this.props.route.siteData;
        if (data.role == null || data.role == "guest") {
            hashHistory.push('/');
        } else if (data.role == "student") {
            hashHistory.push('/student/home');
        }
    }

    render() {
        return (
            <div>
                <NavigationAndDrawer siteData={this.props.route.siteData}/>
                {this.props.children}
            </div>
        )
    }
}
class StudentContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let data = this.props.route.siteData;
        if (data.role == null || data.role == "guest") {
            hashHistory.push('/');
        }
    }


    render() {
        return (
            <div>
                <NavigationAndDrawer siteData={this.props.route.siteData}/>
                {this.props.children}
            </div>
        )
    }
}

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}


export default App;