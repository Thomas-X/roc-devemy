import React from 'react';
import PropTypes from 'prop-types'
import {Divider, List, ListItem, MenuItem, Paper, TextField} from "material-ui";
import * as styles from '../styles';
import CommunicationMailOutline from "material-ui/svg-icons/communication/mail-outline";
import ActionInfoOutline from "material-ui/svg-icons/action/info-outline";
import SocialPersonOutline from "material-ui/svg-icons/social/person-outline";
import axios from 'axios';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        this.props.userdata.isTeacher = String(this.props.userdata.isTeacher);
        return (
            <div>
                <Paper style={styles.paperEditorContent} zDepth={1}>
                    <h1>About me</h1>
                    <hr/>
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
                            {this.props.userdata.isTeacher ?
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
            </div>
        )
    }
}

// TODO add watchedCourses as a PropType
UserProfile.propTypes = {
    userdata: PropTypes.object
}