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

injectTapEventPlugin();


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siteData: {
                _id: "5946815c213d312034889f0d",
                token: "ya29.GlttBKOeiY7z4bfvsZkXT3s_YGUsq_K8EtP4STo0qc4c7OTw2iFt1KyR7yHSWgu12-Yq7IRdqMBuHw1MtG_G8cLNepzGepyzgjGGU6Mw6q86AF3Eg9XnZtlFXArt",
                finishedCourses: [],
                followedCourses: [],
                role: "student",
                email: "thomaszwarts@gmail.com",
                displayImage: "https://lh4.googleusercontent.com/-2CWZ00hNXvs/AAAAAAAAAAI/AAAAAAAACV0/7doIgC3haEk/photo.jpg?sz=50",
                displayName: "Thomas X",
                googleId: "113410351108501075458",
                __v: 0
            }
        }

    }

    // componentWillMount() {
    //     axios.post('/api/getUserData', {token: window.token}).then((response) => {
    //         this.setState({
    //             siteData: response.data
    //         })
    //     })
    // }


    render() {
        if (this.state.siteData != null) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Router history={hashHistory}>
                        <Route path="/" component={Container} siteData={this.state.siteData}>
                            <Route path="/teacher" component={TeacherContainer} siteData={this.state.siteData}>
                            </Route>
                            <Route path="/student" component={StudentContainer} siteData={this.state.siteData}>
                                <Route path="/student/home" component={StudentHome} siteData={this.state.siteData}/>
                            </Route>
                        </Route>
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

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
class TeacherContainer extends React.Component {
    constructor(props) {
        super(props);


    }

    componentWillMount() {
        if (this.props.route.siteData.role != "teacher") {
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
class StudentContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        if (this.props.route.siteData.role == "teacher" || this.props.route.siteData.role == "student") {
        } else {
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