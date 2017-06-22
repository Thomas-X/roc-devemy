import React, {Component} from 'react';
import {Parallax} from 'react-parallax';
import {List, ListItem, Paper, RaisedButton, Tab, Tabs, TextField} from "material-ui";
import {
    ActionAccountCircle, ActionCheckCircle, ActionInfoOutline,
    CommunicationMailOutline
} from "material-ui/svg-icons/index";
import * as styles from "../styles";
import {IndexLink} from "react-router";


export default class AboutMe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabOneSelected: true,
            slideIndex: 0,
        }
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleTabClick() {
        this.setState({
            tabOneSelected: !this.state.tabOneSelected
        })
    }

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    };


    render() {

        let data = this.props.route.siteData;

        let hasFinishedCourses = false;
        if (data.finishedCourses.length > 0) {
            hasFinishedCourses = true;
        }
        return (
            <div>
                <div className="AboutMeHeader">
                    <div className="TabsContainer">
                        <Tabs className="AboutMeTabsContainer">
                            <Tab
                                label='mijn profiel'
                                onClick={this.handleTabClick}
                                icon={<ActionAccountCircle/>}
                            >

                            </Tab>
                            <Tab
                                icon={<ActionCheckCircle/>}
                                onClick={this.handleTabClick}
                                label='voltooide cursussen'>


                            </Tab>

                        </Tabs>
                    </div>
                </div>
                    <Paper className="paperEditorContentAboutMe"
                           style={this.state.tabOneSelected ? {display: 'none'} : {display: 'block'}}>

                        {hasFinishedCourses ?
                            <div className="AboutMeFinishedCourseItemsContainer">
                                {data.finishedCourses.map((elem, index) => {
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
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className="AboutMegreyedOutTextNoFinishedCoursesContainer">
                                    <span className="AboutMegreyedOutTextNoFinishedCoursesContent">
                                        Je hebt nog geen voltooide cursussen
                                    </span>
                                <br/>
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

            </div>
        )
    }
}


