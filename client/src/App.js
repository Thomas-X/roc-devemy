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
import EditCourse from "./components/EditCourse";
import TeacherBoardPage from "./components/TeacherBoardPage";

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
                    _id: "594bce5ed119d42370d42f6a"
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
                ownedData: [
                    {
                        _id: "1",
                        comments: [],
                        allRatingValues: [],
                        totalRatingCount: 0,
                        ratingAverage: 0,
                        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores corpori" +
                        "s deleniti doloremque earum, eius eligendi enim explicabo laboriosam nemo quam rerum similique tempo" +
                        "re vero voluptatibus. Culpa harum hic quasi.",
                        URLToCourse: "https://placekitten.com/640/380",
                        authorEmail: "",
                        author: "Thomas-X",
                        authorId: "",
                        imgURL: "https://placekitten.com/640/380",
                        title: "PHP",
                        __v: 0,
                    },
                    {
                        _id: "2",
                        comments: [],
                        allRatingValues: [],
                        totalRatingCount: 0,
                        ratingAverage: 0,
                        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores corpori" +
                        "s deleniti doloremque earum, eius eligendi enim explicabo laboriosam nemo quam rerum similique tempo" +
                        "re vero voluptatibus. Culpa harum hic quasi.",
                        URLToCourse: "https://placekitten.com/640/380",
                        authorEmail: "",
                        author: "Thomas-X",
                        authorId: "",
                        imgURL: "https://placekitten.com/640/380",
                        title: "JAVA",
                        __v: 0,
                    },
                    {
                        _id: "3",
                        comments: [],
                        allRatingValues: [],
                        totalRatingCount: 0,
                        ratingAverage: 0,
                        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores corpori" +
                        "s deleniti doloremque earum, eius eligendi enim explicabo laboriosam nemo quam rerum similique tempo" +
                        "re vero voluptatibus. Culpa harum hic quasi.",
                        URLToCourse: "https://placekitten.com/640/380",
                        authorEmail: "",
                        author: "Thomas-X",
                        authorId: "",
                        imgURL: "https://placekitten.com/640/380",
                        title: "SQL",
                        __v: 0,
                    },
                    {
                        _id: "4",
                        comments: [],
                        allRatingValues: [],
                        totalRatingCount: 0,
                        ratingAverage: 0,
                        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores corpori" +
                        "s deleniti doloremque earum, eius eligendi enim explicabo laboriosam nemo quam rerum similique tempo" +
                        "re vero voluptatibus. Culpa harum hic quasi.",
                        URLToCourse: "https://placekitten.com/640/380",
                        authorEmail: "",
                        author: "Thomas-X",
                        authorId: "",
                        imgURL: "https://placekitten.com/640/380",
                        title: "HTML",
                        __v: 0,
                    }
                ],
            }
        };
        this.createCourseUpdateState = this.createCourseUpdateState.bind(this);
        this.removeCourseUpdateState = this.removeCourseUpdateState.bind(this);
        this.saveEditCourseUpdateState = this.saveEditCourseUpdateState.bind(this);
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

    removeCourseUpdateState(courseId) {

        let data = this.state.siteData;
        if (data.followedCourses.includes(courseId)) {
            this.setState({
                followedCourses: data.followedCourses.splice(data.followedCourses.indexOf(courseId), 1)
            })
        }
        data.finishedCourses.forEach((elem, index) => {
            if (elem._id == courseId) {
                this.setState({
                    finishedCourses: data.finishedCourses.splice(index, 1)
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
             if(elem._id == updatedCourse._id) {
                 console.log(updatedCourse);
                 this.state.siteData.ownedData[index] = updatedCourse;
                 console.log(this.state.siteData.ownedData[index]);
                 this.setState(this.state);
             }
        });
    }



    render() {
        if (this.state.siteData != null) {
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