import React, {Component} from 'react';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {Avatar, List, ListItem} from 'material-ui';
import axios from 'axios';
import * as styles from "../styles";
import {IndexLink} from "react-router";

export default class CoursesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            data: [],
            loaded: false,
        }
    }

    componentDidMount() {
        axios.get('/api/getCourseDataById').then(function (responseCourseData) {
            //we get a return of course by user from the server API

            var success = JSON.parse(responseCourseData['data']['success']);

            if(success) {
                var courses = JSON.parse(responseCourseData['data'])['courses'];

                console.log(JSON.parse(responseCourseData['data']));

                this.setState({
                    loaded: true,
                })

                for (var o = 0; o < courses.length; o++) {
                    this.state.data.push(courses[o]);
                }
            }
        }.bind(this));
    };

    render() {
        return (
            <div>
                {this.state.loaded ?
                    <div>
                        <ListItem
                            primaryText='Courses'
                            leftIcon={<ActionAssignment/>}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            nestedItems=
                                {
                                    this.state.data.map(function (courseItem, index) {
                                        console.log(this.state.data, courseItem);
                                        return (
                                            <IndexLink to={"/courses/" + courseItem._id}><ListItem
                                                key={index}
                                                primaryText={
                                                    <div style={styles.courseListItemTitleContainer}>
                                                        <span
                                                            style={styles.courseListItemTitle}>{courseItem.title}</span>
                                                        <span
                                                            style={styles.courseListItemSubTitleAuthor}>{courseItem.author}</span>
                                                    </div>}
                                                innerDivStyle={styles.courseListItem}
                                                leftAvatar={
                                                    <Avatar size={30} style={styles.courseListItemAvatar}>
                                                        {courseItem.title.substr(0, 1)}
                                                    </Avatar>}>
                                            </ListItem>
                                            </IndexLink>
                                        )
                                    }.bind(this))
                                }
                        />
                    </div>
                    :
                    null
                }
            </div>

        )
    }

}