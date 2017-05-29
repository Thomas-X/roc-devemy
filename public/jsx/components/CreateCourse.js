import React, {Component} from "react";
import * as styles from "../styles";
import {Paper, RaisedButton, TextField} from "material-ui";
import {hashHistory} from 'react-router';
import axios from 'axios';
import {FormsyText} from "formsy-material-ui";
import Formsy from 'formsy-react';

export default class CreateCourse extends Component {

    constructor(props) {
        super(props);
        this.courseTitleChange = this.courseTitleChange.bind(this);
        this.courseImgURLChange = this.courseImgURLChange.bind(this);
        this.courseURLChange = this.courseURLChange.bind(this);
        this.courseDescriptionChange = this.courseDescriptionChange.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);

        this.state = {
            title: null,
            imgURL: null,
            URL: null,
            description: null,
            authorId: null,
            canSubmit: false,
        }
    }

    componentDidMount() {
        axios.get('/api/getUserId').then(function (response) {

            response = JSON.parse(response['data']);

            // I know, response.succes and !response.succes, but just to be safe
            if (response.success == true) {
                this.setState({
                    authorId: response.id,
                })
            } else if (response.success == false) {
                hashHistory.push('/');
            }
        }.bind(this));
    }

    saveCourse() {
        if (this.state.authorId != null) {
            var init = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.state.title,
                    imgURL: this.state.imgURL,
                    URL: this.state.URL,
                    authorId: this.state.authorId,
                    description: this.state.description,
                    _id: this.props.params.courseid,
                    delete: false,
                }),
            };
            fetch('/api/saveCourse', init)
                .then(function (response) {
                    hashHistory.push('/');
                }.bind(this));
        }
    }

    deleteCourse() {
        var init = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: this.props.params.courseid,
                delete: true,
            }),
        };
        fetch('/api/saveCourse', init)
            .then(function (response) {
                hashHistory.push('/');
            }.bind(this));
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
            URL: event.target.value,
        })
    }

    courseDescriptionChange(event) {
        this.setState({
            description: event.target.value,
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

    render() {
        return (
            <div>
                <Paper style={styles.paperEditorContent} zDepth={1}>
                    <div style={styles.courseEditorTextFieldsContainer}>
                        <Formsy.Form
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            style={styles.courseEditorTextFieldsContainer}>

                            <FormsyText
                                name="Titel"
                                validationError="Verplicht"
                                required
                                hintText="Titel van de cursus"
                                floatingLabelText="Titel"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                style={styles.chapterTitleEditor}
                                updateImmediately
                                onChange={function (event) {
                                    this.courseTitleChange(event);
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
                                underlineStyle={styles.underlineStyle}
                                multiLine={true}
                                rows={2}
                                style={styles.chapterTitleEditor}
                                updateImmediately
                                onChange={function (event) {
                                    this.courseDescriptionChange(event);
                                }.bind(this)}
                            />
                            <FormsyText
                                name="imageURL"
                                validations="isUrl"
                                validationError="Een geldige URL aub"
                                required
                                hintText="http://www.placekitten.com/640/380"
                                floatingLabelText="Plaatje van de cursus"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                style={styles.chapterTitleEditor}
                                underlineStyle={styles.underlineStyle}

                                updateImmediately
                                onChange={function (event) {
                                    this.courseImgURLChange(event);
                                }.bind(this)}
                            />
                            <FormsyText
                                name="URL"
                                validations="isUrl"
                                validationError="Een geldige URL aub"
                                required
                                floatingLabelText="URL naar de cursus"
                                hintText="http://www.example.com"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                underlineStyle={styles.underlineStyle}

                                style={styles.chapterTitleEditor}
                                updateImmediately
                                onChange={function (event) {
                                    this.courseURLChange(event);
                                }.bind(this)}
                            />
                        </Formsy.Form>

                    </div>
                    <div style={styles.editorContainer}>
                        <RaisedButton onClick={this.saveCourse} primary={true} style={styles.publishCourseButtonEditor}
                                      label='cursus opslaan'  disabled={!this.state.canSubmit}/>
                        <RaisedButton label="verwijder cursus" onClick={this.deleteCourse}
                                      labelStyle={styles.removeChapterButton}/>
                    </div>
                </Paper>
            </div>
        )
    }
}