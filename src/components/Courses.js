import React, {Component} from 'react';
import {Divider} from "material-ui";


export default class Courses extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        if (this.props.siteData.followedCourses.length > 0) {
            return (
                <div className="StudentHomeCourses">
                    {this.props.siteData.followedCourses.map((elem, index) => {
                        return (
                            <div className="StudentHomeCoursesCard">
                                <img className="StudentHomeCoursesCardImage" src={elem.imgURL}/>
                                <h1 className="StudentHomeCoursesCardTitle">{elem.title}</h1>
                            </div>

                        )
                    })}

                </div>
            )
        } else {
            return (
                <div className="StudentHomeCourses">
                    <h1>JE VOLGT NOG NIETS</h1>
                </div>
            )
        }
    }
}
