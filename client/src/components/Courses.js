import React, {Component} from 'react';
import {Divider, Paper} from "material-ui";


export default class Courses extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        if (this.props.siteData.followedCourses.length > 0) {
            return (
                <Paper zDepth={1} className="StudentHomeCourses">
                    {this.props.siteData.followedCourses.map((elem, index) => {
                        return (
                            <div className="StudentHomeCoursesCard">
                                <img className="StudentHomeCoursesCardImage" src={elem.imgURL}/>
                                <h1 className="StudentHomeCoursesCardTitle">{elem.title}</h1>
                            </div>

                        )
                    })}

                </Paper>
            )
        } else {
            return (
                <Paper zDepth={1} className="StudentHomeCourses">
                    <h1>JE VOLGT NOG NIETS</h1>
                </Paper>
            )
        }
    }
}
