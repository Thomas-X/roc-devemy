import React, {Component} from 'react';
import {Parallax} from 'react-parallax';
import {List, ListItem, Paper, RaisedButton, Snackbar, Tab, Tabs, TextField} from "material-ui";
import {
    ActionAccountCircle, ActionCheckCircle, ActionInfoOutline,
    CommunicationMailOutline
} from "material-ui/svg-icons/index";
import * as styles from "../styles";
import {IndexLink} from "react-router";
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';


export default class AboutMe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabOneSelected: true,
            finishedCoursesData: [],
        }
        this.handleTabOneClick = this.handleTabOneClick.bind(this);
        this.handleTabTwoClick = this.handleTabTwoClick.bind(this);
    }


    // I am aware this isn't great code.

    handleTabOneClick() {
        this.setState({
            tabOneSelected: true,
        })
    }

    handleTabTwoClick() {
        this.setState({
            tabOneSelected: false,
        })
    }

    componentWillMount() {
        axios.post('/api/getFinishedCoursesData', {token: this.props.route.siteData.token}).then((response) => {
            if (response.data.finishedCoursesData) {
                this.setState({
                    finishedCoursesData: response.data.finishedCoursesData,
                })
            }
        });
    }


    render() {

        let data = this.props.route.siteData;

        let hasFinishedCourses = false;
        if (this.state.finishedCoursesData.length > 0) {
            hasFinishedCourses = true;
        }
        return (
            <div>
                <div className="AboutMeHeader">
                    <div className="TabsContainer">
                        <Tabs className="AboutMeTabsContainer">
                            <Tab
                                label='mijn profiel'
                                onClick={this.handleTabOneClick}
                                icon={<ActionAccountCircle/>}>

                            </Tab>
                            <Tab
                                icon={<ActionCheckCircle/>}
                                onClick={this.handleTabTwoClick}
                                label='voltooide cursussen'>


                            </Tab>

                        </Tabs>
                    </div>
                </div>

                {/* profile page */}
                <Paper className="paperEditorContentAboutMe"
                       style={this.state.tabOneSelected ? {display: 'block'} : {display: 'none'}}>
                    <div className="AboutMeDisplayImageContainer">
                        <img src={data.displayImage} className="AboutMeDisplayImage"/>
                    </div>
                    <div className="AboutMeUserNameContainer">
                        <span className="AboutMeUserName">{data.displayName}</span>
                    </div>

                    <div className="AboutMeUserDataContainer">
                        <List>

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
                                            defaultValue={data.email}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                            className='userProfileAboutEmail'
                                        />
                                    </div>
                                }>
                            </ListItem>
                            {data.isTeacher ?
                                <ListItem
                                    primaryText="Je bent een leraar"
                                    leftIcon={<ActionInfoOutline/>}
                                    disabled={true}
                                />
                                :
                                <ListItem
                                    primaryText="Je bent een student"
                                    leftIcon={<ActionInfoOutline/>}
                                    disabled={true}
                                />
                            }<br/>
                        </List>
                    </div>
                </Paper>

                <Paper className="paperEditorContentAboutMe"
                       style={this.state.tabOneSelected ? {display: 'none'} : {display: 'block'}}>

                    {hasFinishedCourses ?
                        <div className="AboutMeFinishedCourseItemsContainer">
                            {this.state.finishedCoursesData.map((elem, index) => {
                                return (
                                    <div className="AboutMeFinishedCourseItemContainer" key={index}>
                                        <img src={elem.imgURL} className="AboutMeFinishedCourseItemImage"/>
                                        <div className="AboutFinishedCourseItemContentContainer">
                                                <span
                                                    className="AboutFinishedCourseItemContentTitle">{elem.title}</span>
                                            <br/>
                                            <i><span
                                                className="AboutFinishedCourseItemContentAuthor">Docent: {elem.author}</span></i>
                                        </div>
                                        <CopyiFrameCode userId={this.props.route.siteData._id} courseId={elem._id}/>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className="AboutMegreyedOutTextNoFinishedCoursesContainer">
                                    <span className="AboutMegreyedOutTextNoFinishedCoursesContent">
                                        Je hebt nog geen voltooide cursussen
                                    </span>
                            <span className="AboutMeSmallText"><i>Klopt dit niet? Praat met je docent.</i></span>
                            <br/>
                            <IndexLink to={data.role + '/home'}>
                                <RaisedButton
                                    label="Terug naar thuispagina"
                                    primary={true}
                                    className='TeacherHomeCreateCourseButton'/>
                            </IndexLink>
                        </div>
                    }


                </Paper>


            </div>
        )
    }
}

class CopyiFrameCode extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
        this.handleToastPopup = this.handleToastPopup.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleToastPopup() {
        this.setState({
            open: true,
        })
    }

    handleRequestClose() {
        this.setState({
            open: false,
        })
    }

    render() {
        return (
            <div>
                <CopyToClipboard
                    text={"<iframe src=\"http://localhost:5001/#/iframe/" + this.props.userId + "/" + this.props.courseId + "\" width=\"250\" height=\"300\" frameBorder=\"0\"></iframe>"
                    } onCopy={this.handleToastPopup}>
                    <RaisedButton label='Kopieer iFrame code' primary={true}
                                  className='whiteText' fullWidth={true}/>
                </CopyToClipboard>
                <Snackbar
                    open={this.state.open}
                    message="iFrame code gekopieerd"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

