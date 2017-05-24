import React, {Component} from "react";
import * as styles from "../styles";
import {Paper, RaisedButton, TextField} from "material-ui";
import { hashHistory } from 'react-router';
import axios from 'axios';

export default class CreateCourse extends Component {

    constructor(props) {
        super(props);
        this.courseTitleChange = this.courseTitleChange.bind(this);
        this.courseImgURLChange = this.courseImgURLChange.bind(this);
        this.courseURLChange = this.courseURLChange.bind(this);
        this.courseDescriptionChange = this.courseDescriptionChange.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

        this.state = {
            title: null,
            imgURL: null,
            URL: null,
            description: null,
            authorId: null,
        }
    }

    componentDidMount() {
        axios.get('/api/getUserId').then(function (response) {

            response = JSON.parse(response['data']);
            console.log(response, response.success);

            // I know, response.succes and !response.succes, but just to be safe
            if(response.success == true) {
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

    render() {
        return (
            <div>
                <Paper style={styles.paperEditorContent} zDepth={1}>
                    <div style={styles.courseEditorTextFieldsContainer}>
                        <TextField
                            hintText='Type iets ..'
                            floatingLabelText='Titel van de cursus'
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            style={styles.chapterTitleEditor}
                            onChange={function (event) {
                                this.courseTitleChange(event);
                            }.bind(this)}/>
                        <TextField
                            hintText='Type iets ..'
                            floatingLabelText='Korte beschrijving'
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            style={styles.chapterTitleEditor}
                            onChange={function (event) {
                                this.courseDescriptionChange(event);
                            }.bind(this)}/>
                        <TextField
                            hintText='Type iets ..'
                            floatingLabelText='Plaatje van de cursus'
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            style={styles.chapterTitleEditor}
                            onChange={function (event) {
                                this.courseImgURLChange(event);
                            }.bind(this)}/>
                        <TextField
                            hintText='Type iets ..'
                            floatingLabelText='URL naar cursus'
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            style={styles.chapterTitleEditor}
                            onChange={function (event) {
                                this.courseURLChange(event);
                            }.bind(this)}/>
                    </div>
                    <div style={styles.editorContainer}>
                        <RaisedButton onClick={this.saveCourse} primary={true} style={styles.publishCourseButtonEditor} label='cursus opslaan'/>
                        <RaisedButton label="verwijder cursus" onClick={this.deleteCourse} labelStyle={styles.removeChapterButton}/>
                    </div>
                </Paper>
            </div>
        )
    }
}