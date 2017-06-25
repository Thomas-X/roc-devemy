import React from 'react';
import PropTypes from 'prop-types'
import {Divider, List, ListItem, MenuItem, Paper, TextField} from "material-ui";
import * as styles from '../styles';
import CommunicationMailOutline from "material-ui/svg-icons/communication/mail-outline";
import ActionInfoOutline from "material-ui/svg-icons/action/info-outline";
import SocialPersonOutline from "material-ui/svg-icons/social/person-outline";
import axios from 'axios';
import CourseItem from './CourseItem';
import FinishedCourseItem from "./FinishedCourseItem";


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
            <div className='aboutContainer'>
                <Paper className='meAboutContainer' zDepth={1}>
                    <div className='userProfileAbout'>
                        <div className='userProfileAboutUserImageAndUsernameContainer'>
                            <img src={this.props.userdata.displayImage} className='styles.userProfileAboutUserImage'/>
                        </div>
                        <List>
                            <ListItem
                                leftIcon={<SocialPersonOutline/>}
                                disabled={true}>
                                {this.props.userdata.displayName}
                            </ListItem>

                            <ListItem
                                className='userProfileAboutUserName'
                                disabled={true}
                                children={
                                    <div key={0} className='userProfileAboutEmailAndIsTeacherContainer'>
                                        <CommunicationMailOutline key={1}
                                                                  className='userProfileAboutLeftIconEmail'/>
                                        <TextField
                                            disabled={true}
                                            key={2}
                                            hintText="Email"
                                            floatingLabelText="Email"
                                            defaultValue={this.props.userdata.email}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                            className='userProfileAboutEmail'
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
                {this.props.finishedCoursesData.map((elem, index) => {
                    if (elem != null && this.props.finishedCoursesData.length > 0) {
                        return (
                            <Paper className='finishedCoursesContainer' zDepth={1}>
                                <h1 className='lightHeader'>Afgemaakte cursussen</h1>
                                <Divider/>
                                <div className='finishedCourseItemsContainer'>
                                <FinishedCourseItem courseData={elem} userId={this.props.userdata._id}/>
                                </div>
                            </Paper>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
        )
    }
}

// TODO add watchedCourses as a PropType
UserProfile.propTypes = {
    userdata: PropTypes.object,
}