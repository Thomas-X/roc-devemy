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
import StudentHome from "./components/StudentHome";
import NavigationAndDrawer from "./components/NavigationAndDrawer";
import Search from "./components/Search";
import TeacherHome from "./components/TeacherHome";
import CreateCourse from "./components/CreateCourse";
import AboutMe from "./components/AboutMe";
import ViewCourse from "./components/ViewCourse";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

injectTapEventPlugin();


class App extends Component {
    constructor(props) {
        super(props);

        // TODO default state of siteData should be


        this.state = {
            siteData: {
                _id: "5946815c213d312034889f0d",
                token: "ya29.GlttBKOeiY7z4bfvsZkXT3s_YGUsq_K8EtP4STo0qc4c7OTw2iFt1KyR7yHSWgu12-Yq7IRdqMBuHw1MtG_G8cLNepzGepyzgjGGU6Mw6q86AF3Eg9XnZtlFXArt",
                finishedCourses: [{
                    title: "some title",
                    imgURL: "https://placekitten.com/640/380",
                    URLToCourse: "https://placekitten.com/640/380",
                    author: "Thomas-X",
                }, {
                    title: "some title",
                    imgURL: "https://placekitten.com/640/380",
                    URLToCourse: "https://placekitten.com/640/380",
                    author: "Thomas-X",
                }, {
                    title: "some title",
                    imgURL: "https://placekitten.com/640/380",
                    URLToCourse: "https://placekitten.com/640/380",
                    author: "Thomas-X",
                }, {
                    title: "some title",
                    imgURL: "https://placekitten.com/640/380",
                    URLToCourse: "https://placekitten.com/640/380",
                    author: "Thomas-X",
                }],
                followedCourses: [],
                role: "teacher",
                email: "thomaszwarts@gmail.com",
                displayImage: "https://lh4.googleusercontent.com/-2CWZ00hNXvs/AAAAAAAAAAI/AAAAAAAACV0/7doIgC3haEk/photo.jpg?sz=50",
                displayName: "Thomas X",
                googleId: "113410351108501075458",
                isTeacher: true,
                __v: 0,
                ownedData: [{
                    _id: "594bce5ed119d42370d42f6a",
                    comments: [],
                    allRatingValues: [],
                    totalRatingCount: 0,
                    ratingAverag: 0,
                    description: "[object Object]",
                    URLToCourse: "https://placekitten.com/640/380",
                    authorEmail: "",
                    author: "",
                    authorId: "",
                    imgURL: "https://placekitten.com/640/380",
                    title: "sadsad",
                    __v: 0,
                }],
            }
        };
        this.createCourseUpdateState = this.createCourseUpdateState.bind(this);

    }


    // add this in production

    // componentWillMount() {
    //     axios.post('/api/getUserData', {token: window.token}).then((response) => {
    //             if(response.data.siteData) {
//
    //         this.setState({
    //             siteData: response.data
    //         })
//                  } else {
    //              hashHistory.push('/errorwedontknowwhathappened');
    // }
    //     })
    // }

    createCourseUpdateState(course) {
        this.setState({
            ownedData: this.state.siteData.ownedData.push(course)
        })
    }


    render() {
        if (this.state.siteData != null) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Router history={hashHistory}>
                        <Route path="/" component={Home} siteData={this.state.siteData}/>

                        <Route path="/guest/home" component={Home2} siteData={this.state.siteData}/>

                        <Route path="/teacher" component={TeacherContainer} siteData={this.state.siteData}>
                            <Route path="/teacher/home" component={TeacherHome} siteData={this.state.siteData}/>
                            <Route path="/teacher/home/createCourse"
                                   component={CreateCourse}
                                   siteData={this.state.siteData}
                                   createCourse={this.createCourseUpdateState}/>
                            <Route path="/teacher/home/me" component={AboutMe} siteData={this.state.siteData}/>
                        </Route>
                        <Route path="/student" component={StudentContainer} siteData={this.state.siteData}>
                            <Route path="/student/home" component={StudentHome} siteData={this.state.siteData}/>
                            <Route path="/student/search" component={Search} siteData={this.state.siteData}/>
                            <Route path="/student/home/course/:courseid" component={ViewCourse}
                                   siteData={this.state.siteData}/>
                        </Route>

                        <Route path="*" component={NotFound} siteData={this.state.siteData}/>
                    </Router>
                </MuiThemeProvider>
            )
        } else {
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


export default App;