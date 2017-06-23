import React, {Component} from 'react';
import {FontIcon, Paper, Tab, Tabs} from "material-ui";
import {ActionDashboard, AvEqualizer, MapsPersonPin} from "material-ui/svg-icons/index";
import RaisedButton from 'material-ui/RaisedButton';
import {IndexLink} from "react-router";

export default class TeacherHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let hasCourses = false;
        if (this.props.route.siteData.ownedData.length > 0) {
            hasCourses = true;
        }
        let data = this.props.route.siteData;

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
                                            <div className="TeacherHomeMyCourseContainer">
                                                {elem.imageURL}
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