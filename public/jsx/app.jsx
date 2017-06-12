import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import {muiTheme, customTheme} from './customMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as styles from './styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// import components
import NavigationAndDrawer from './components/NavigationAndDrawer';
import NotLoggedInHomepage from './components/CheckLoggedInOrNotHomePage';
import NotFound from './components/NotFound';
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import CreateCourse from "./components/CreateCourse";
import CreateCourseAndRedirect from "./components/CreateCourseAndRedirect";
import MyCourses from "./components/MyCourses";
import test from './test';
import Me from "./components/Me";
import Search from './components/Search';
import ViewCourse from './components/ViewCourse';
import formsyExample from "./formsyExample";
import TeacherBoardPage from './components/TeacherBoardPage';
import Iframe from "./components/Iframe";
import EditCourse from "./components/EditCourse";

class App extends Component {

    // TODO if a course is deleted, remove that specific courseID from all the user's followedCourses, since it doesn't exist anymore
    // TODO and it'll give an error if React tries to do anything  with it

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={Container}>
                        <IndexRoute component={NotLoggedInHomepage}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/courses/createCourse" component={CreateCourseAndRedirect}/>
                        <Route path="/courses/editor/:courseid" component={CreateCourse}/>
                        <Route path="/courses/:courseid" component={ViewCourse}/>

                        <Route path="/about/me" component={Me}/>
                        <Route path="/about/me/mycourses" component={MyCourses}/>

                        <Route path="/search" component={Search}/>
                        <Route path="/teacher/course/:courseid" component={TeacherBoardPage}/>
                        {/* this should always be the last route, otherwise the router params routes break*/}
                        <Route path="/test" component={formsyExample}/>
                        <Route path="/courses/edit/:courseid" component={EditCourse}/>
                    </Route>
                    <Route path="/iframe/:courseid/:userid" component={Iframe}/>
                    <Route path="*" component={NotFound}/>
                </Router>
            </MuiThemeProvider>
        )
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationAndDrawer/>
                <div style={styles.container}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));