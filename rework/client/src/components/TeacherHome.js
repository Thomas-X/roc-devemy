import React, {Component} from 'react';
import {Dialog, Divider, FlatButton, FontIcon, Paper, Tab, Tabs} from "material-ui";
import {ActionDashboard, AvEqualizer, MapsPersonPin} from "material-ui/svg-icons/index";
import RaisedButton from 'material-ui/RaisedButton';
import {IndexLink} from "react-router";
import {customTheme as customMuiTheme} from "../customMuiTheme";
import axios from 'axios';
import {hashHistory} from 'react-router';

export default class TeacherHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({modalOpen: true});
    }

    handleClose() {
        this.setState({modalOpen: false});
    }

    removeCourse(courseId) {
        this.props.route.removeCourseUpdateState(courseId);
        console.log(this.props.route.siteData.finishedCourses);


        // add this in production

        axios.post('/api/removeCourse', {courseId: courseId}).then((response) => {
            if(response.status === 200) {
                this.props.route.removeCourseUpdateState(courseId);
            } else {
                // show an error with a toast? (snackbar)
            }
        })
    }

    render() {
        let hasCourses = false;
        if (this.props.siteData.ownedData != null && this.props.route.siteData.ownedData.length > 0) {
            hasCourses = true;
        }
        let data = this.props.route.siteData;

        console.log(data.ownedData);

        return (
            <Paper className='paperEditorContentTeacher' zDepth={1}>
                <Tabs>
                    <Tab
                        icon={<ActionDashboard/>}
                        label="mijn cursussen"
                    >
                        <div className="slideContainer">
                            {hasCourses ?
                                <div>
                                    {data.ownedData.map((elem, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="TeacherHomeMyCourseContainer">
                                                    <div className="MyCourseTitleAndDescriptionAndImageContainer">
                                                        <img src={elem.imgURL} className="MyCourseImage"/>
                                                        <div className="MyCourseTitleAndDescriptionContainer">
                                                            <span className="MyCourseTitle">{elem.title}</span>
                                                            <div className="MyCourseAuthorAndRatingContainer">
                                                                <span>Door: {elem.author}</span><br/>
                                                                <span>{elem.ratingAverage} gemiddelde rating</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="MyCourseButtonsContainer">

                                                        <PopUpModalDialog courseId={elem._id}
                                                                          removeCourseUpdateState={this.props.route.removeCourseUpdateState}/>

                                                        <div className="EditAndStudentButtonsContainer">
                                                            <IndexLink to={"/teacher/home/editCourse/" + elem._id}>
                                                                <RaisedButton label="Pas aan" primary={true}
                                                                          className="EditCourseButton"/>
                                                            </IndexLink>
                                                            <IndexLink to={"/teacher/home/courseStudents/" + elem._id}>
                                                            <RaisedButton label="Studenten" secondary={true}
                                                                          className="StudentButton"/>
                                                            </IndexLink>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider className="MyCoursesDivider"/>
                                            </div>
                                        )
                                    })}

                                </div>
                                :
                                <div className="TeacherHomegreyedOutTextNoOwnedCoursesContainer">
                                    <span className="TeacherHomegreyedOutTextNoOwnedCourses">
                                        Je hebt nog geen cursussen aangemaakt
                                    </span>
                                    <br/>
                                    <IndexLink to="/teacher/home/createCourse">
                                        <RaisedButton
                                            label="Maak cursus"
                                            primary={true}
                                            className='TeacherHomeCreateCourseButton'/>
                                    </IndexLink>
                                </div>
                            }
                        </div>
                    </Tab>
                    <Tab
                        icon={<AvEqualizer/>}
                        label="statistieken"
                    >
                        <div className="slideContainer">
                            {hasCourses ?
                                <div>
                                    {/*return the teacher's courses' stats */}
                                </div>
                                :
                                <div className="TeacherHomegreyedOutTextNoOwnedCoursesContainer">
                                    <span className="TeacherHomegreyedOutTextNoOwnedCourses">
                                        Je hebt nog geen cursussen aangemaakt
                                    </span>
                                    <br/>
                                    <IndexLink to="/teacher/home/createCourse">
                                        <RaisedButton
                                            label="Maak cursus"
                                            primary={true}
                                            className='TeacherHomeCreateCourseButton'/>
                                    </IndexLink>
                                </div>
                            }
                        </div>
                    </Tab>
                </Tabs>
            </Paper>
        )
    }
}

class PopUpModalDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({modalOpen: true});
    }

    handleClose() {
        this.setState({modalOpen: false});
    }

    render() {
        return (

            <div className="removeCourseButton">
                <RaisedButton className="removeCourseButton" label="Verwijderen"
                              labelStyle={{color: '#e53935'}}
                              onTouchTap={this.handleOpen}/>
                <Dialog
                    title="Deze actie kan niet ongedaan worden, weet je het zeker?"
                    actions={
                        <div>
                            <FlatButton
                                label="Nee"
                                secondary={true}
                                onTouchTap={this.handleClose}
                            />
                            <FlatButton
                                label="Ja"
                                className='removeChapterButtonColor'
                                primary={true}
                                onTouchTap={this.handleClose}
                                onClick={() => {
                                    this.props.removeCourseUpdateState(this.props.courseId);
                                }}
                            />
                        </div>
                    }
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}>
                </Dialog>
            </div>
        )
    }
}