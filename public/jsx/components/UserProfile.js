import React from 'react';
import PropTypes from 'prop-types'
import {Divider, List, ListItem, MenuItem, Paper, TextField} from "material-ui";
import * as styles from '../styles';
import CommunicationMailOutline from "material-ui/svg-icons/communication/mail-outline";
import ActionInfoOutline from "material-ui/svg-icons/action/info-outline";
import SocialPersonOutline from "material-ui/svg-icons/social/person-outline";
import axios from 'axios';
import CourseItem from './CourseItem';


export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        let role = false
        if (this.props.userdata.role == 'teacher') {
            role = true;
        }
        return (
            <div style={styles.aboutContainer}>
                <Paper style={styles.meAboutContainer} zDepth={1}>
                    <div style={styles.userProfileAbout}>
                        <div style={styles.userProfileAboutUserImageAndUsernameContainer}>
                            <img src={this.props.userdata.displayImage} style={styles.userProfileAboutUserImage}/>
                        </div>
                        <List>
                            <ListItem
                                leftIcon={<SocialPersonOutline/>}
                                disabled={true}>
                                {this.props.userdata.displayName}
                            </ListItem>

                            <ListItem
                                style={styles.userProfileAboutUserName}
                                disabled={true}
                                children={
                                    <div key={0} style={styles.userProfileAboutEmailAndIsTeacherContainer}>
                                        <CommunicationMailOutline key={1}
                                                                  style={styles.userProfileAboutLeftIconEmail}/>
                                        <TextField
                                            disabled={true}
                                            key={2}
                                            hintText="Email"
                                            floatingLabelText="Email"
                                            defaultValue={this.props.userdata.email}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                            style={styles.userProfileAboutEmail}
                                        />
                                    </div>
                                }>
                            </ListItem>
                            {role ?
                                <ListItem
                                    primaryText="You're a Teacher!"
                                    leftIcon={<ActionInfoOutline/>}
                                    disabled={true}
                                />
                                :
                                <ListItem
                                    primaryText="You're a Student!"
                                    leftIcon={<ActionInfoOutline/>}
                                    disabled={true}
                                />
                            }<br/>
                        </List>

                    </div>
                </Paper>
                <div style={styles.finishedCoursesContainer}>
                    <hr/>
                    {this.props.finishedCoursesData.map((elem, index) => {
                        if (elem != null && this.props.finishedCoursesData.length > 0) {
                            return (
                                <div>
                                    <h1 style={styles.lightHeader}>Afgemaakte cursussen</h1>
                                    <CourseItem courseData={elem}/>
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        )
    }
}

// TODO add watchedCourses as a PropType
UserProfile.propTypes = {
    userdata: PropTypes.object,
}