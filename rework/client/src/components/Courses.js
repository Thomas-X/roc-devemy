import React, {Component} from 'react';
import {Divider, Paper, RaisedButton} from "material-ui";
import {IndexLink} from "react-router";


export default class Courses extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        if (this.props.siteData.followedCoursesData != null && this.props.siteData.followedCoursesData.length > 0) {
            return (
                <Paper zDepth={1} className="paperViewCourseContainer" id="minHeightAndFlex">
                    {this.props.siteData.followedCoursesData.map((elem, index) => {
                        return (
                            <div className="StudentHomeCoursesCard">
                                <IndexLink to={"/student/home/course/" + elem._id} className="StudentHomeIndexLinkImageAndCardTitle">
                                    <img className="StudentHomeCoursesCardImage" src={elem.imgURL}/>
                                    <span className="StudentHomeCoursesCardTitle">{elem.title}</span>
                                </IndexLink>
                                <a href={elem.URLToCourse}>
                                    <RaisedButton className='StudentHomeCoursesGoToCourseDirectlyButton'
                                                  label='Ga direct naar cursus' primary={true}/>
                                </a>
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
