import React, {Component} from 'react';
import {Paper, RaisedButton, Tab, Tabs} from "material-ui";
import {ContentCreate, EditorModeEdit, EditorShortText} from "material-ui/svg-icons/index";
import {FormsyText} from "formsy-material-ui";
import * as styles from "../styles";
import Formsy from 'formsy-react';
import axios from 'axios';
import {hashHistory} from 'react-router';

export default class CreateCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            imgURL: null,
            URLToCourse: null,
            description: null,
            authorId: null,
            canSubmit: false,
        }

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.courseTitleChange = this.courseTitleChange.bind(this);
        this.courseImgURLChange = this.courseImgURLChange.bind(this);
        this.courseURLChange = this.courseURLChange.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    handleEditorChange(value) {
        this.setState({description: value})
    }

    courseTitleChange(event) {
        this.setState({
            title: event.target.value,
        })
    }

    courseImgURLChange(event) {
        this.setState({
            imgURL: event.target.value,
        })
    }

    courseURLChange(event) {
        this.setState({
            URLToCourse: event.target.value,
        })
    }

    enableButton() {
        this.setState({
            canSubmit: true,
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false,
        });
    }

    saveCourse() {
        // axios.post('/api/createCourse', {
        //     title: this.state.title,
        //     imgURL: this.state.imgURL,
        //     URLToCourse: this.state.URLToCourse,
        //     description: this.state.description,
        // }).then((response) => {
        //     if(response.data.createCourse) {
        //         console.log('createCourse!!');
        //         this.props.route.createCourse(response.data.createCourse);
        //         hashHistory.push('/teacher/home');
        //     }
        // })
        this.props.route.createCourse({
            title: "some title",
            imgURL: "some url",
            authorId: 123321,
            author: "you get the idea",
            URLToCourse: "http://google.com",
            description: "sadasd",
            ratingAverage: 0,
            totalRatingCount: 0,
            allRatingValues: [],
            comments: [],
        });
    }


    render() {

        return (
            <Paper zDepth={1} className="paperEditorContentTeacher">
                <Tabs>
                    <Tab
                        icon={<ContentCreate/>}
                        label="Editor"
                    >
                        <div className="CreateCourseSlideContainer">
                            <Formsy.Form
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                            >
                                <div className="CreateCourseTitleAndImageURLContainer">
                                    <FormsyText
                                        name="Titel"
                                        validationError="Verplicht"
                                        required
                                        hintText="Titel van de cursus"
                                        floatingLabelText="Titel"
                                        className="CreateCourseTitleTextField"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        underlineFocusStyle={styles.underlineStyle}
                                        updateImmediately
                                        onChange={function (event) {
                                            this.courseTitleChange(event);
                                        }.bind(this)}
                                    />

                                    <FormsyText
                                        name="imageURL"
                                        validations="isUrl"
                                        validationError="Een geldige URL aub"
                                        required
                                        className="CreateCourseImgURLTextField"
                                        hintText="http://www.placekitten.com/640/380"
                                        floatingLabelText="Plaatje van de cursus"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        underlineFocusStyle={styles.underlineStyle}

                                        updateImmediately
                                        onChange={function (event) {
                                            this.courseImgURLChange(event);
                                        }.bind(this)}
                                    />
                                </div>
                                <FormsyText
                                    name="URL"
                                    validations="isUrl"
                                    validationError="Een geldige URL aub"
                                    required
                                    fullWidth={true}
                                    floatingLabelText="URL naar de cursus"
                                    hintText="http://www.example.com"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    underlineFocusStyle={styles.underlineStyle}

                                    updateImmediately
                                    onChange={function (event) {
                                        this.courseURLChange(event);
                                    }.bind(this)}
                                />

                                <FormsyText
                                    name="Korte beschrijving"
                                    validationError="Verplicht"
                                    required
                                    hintText="Korte beschrijving van de cursus"
                                    floatingLabelText="Korte beschrijving"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    underlineFocusStyle={styles.underlineStyle}
                                    multiLine={true}
                                    updateImmediately
                                    fullWidth={true}
                                    onChange={function (event) {
                                        this.handleEditorChange(event);
                                    }.bind(this)}
                                />


                            </Formsy.Form>

                            <RaisedButton onClick={this.saveCourse} primary={true} className='publishCourseButtonEditor'
                                          label='cursus opslaan' disabled={!this.state.canSubmit}/>
                        </div>
                    </Tab>
                    <Tab
                        icon={<EditorShortText/>}
                        label="Preview"
                    >

                        <div className="CreateCourseSlideContainer">
                            {/* TODO basically a viewcourse component
                             but with the current state as values instead of data from api*/}
                        </div>
                    </Tab>
                </Tabs>
            </Paper>
        )
    }
}