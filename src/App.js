import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import {muiTheme, customTheme} from './customMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as styles from './styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
import './App.css';
import axios from 'axios';

injectTapEventPlugin();


class App extends Component {
    constructor(props) {
        super(props);


    }

    // TODO if a course is deleted, remove that specific courseID from all the user's followedCourses, since it doesn't exist anymore
    // TODO and it'll give an error if React tries to do anything  with it this is awesome


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={Container}>
                        <Route path="/teacher" component={TeacherContainer}/>
                    </Route>
                </Router>
            </MuiThemeProvider>
        )
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/getUserData')
            .then((response) => {
                this.setState({
                    userData: response
                })
            })
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {userData: this.state.userData})}
            </div>
        )
    }
}
class TeacherContainer extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        console.log(this.props.userData)
        return (
            <div>
                hi
            </div>
        )
    }
}


export default App;