import React, {Component} from 'react';
import {Divider, Paper, RaisedButton} from "material-ui";
import {IndexLink} from "react-router";


export default class Courses extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        if (this.props.siteData.followedCourses != null && this.props.siteData.followedCourses.length > 0) {
            return (
                <Paper zDepth={1} className="StudentHomeCourses">
                    {this.props.siteData.followedCoursesData.map((elem, index) => {
                        return (
                            <div className="StudentHomeCoursesCard">
                                <img className="StudentHomeCoursesCardImage" src={elem.imgURL}/>
                                <h1 className="StudentHomeCoursesCardTitle">{elem.title}</h1>
                                <IndexLink to={elem.URLToCourse}>
                                    <RaisedButton className='StudentHomeCoursesGoToCourseDirectlyButton' label='Ga direct naar cursus' primary={true}/>
                                </IndexLink>
                            </div>

                        )
                    })}

                </Paper>
            )
        } else {
            return (
                <Paper zDepth={1} className="StudentHomeCourses">
                    <div className="TeacherBoardPageNoStudentsFollowedContainer">
                        <span className="TeacherBoardPageNoStudentsFollowed">
                                        Je volgt nog geen cursussen.
                                    </span>
                    </div>
                </Paper>
            )
        }
    }
}
