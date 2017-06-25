import React, {Component} from 'react';
import * as styles from "../styles";
import Formsy from 'formsy-react';
import {FormsyText} from "formsy-material-ui";
import {Paper, RaisedButton} from "material-ui";
import axios from 'axios';
import {hashHistory} from 'react-router';

export default class EditCourse extends Component {
    constructor(props) {
        super(props);


        this.state = {
            title: null,
            imgURL: null,
            URL: null,
            description: null,
            authorId: null,
            canSubmit: false,
        }

        this.courseTitleChange = this.courseTitleChange.bind(this);
        this.courseImgURLChange = this.courseImgURLChange.bind(this);
        this.courseURLChange = this.courseURLChange.bind(this);
        this.courseDescriptionChange = this.courseDescriptionChange.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }


    componentDidMount() {
        axios.post('http://localhost:5000/api/getCourseData', {courseId: this.props.params.courseid}).then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
                let data = response.data
                this.setState({
                    title: data.title,
                    imgURL: data.imgURL,
                    description: data.description,
                    URL: data.URLToCourse,
                })
            } else {
                hashHistory.push('/');
            }
        })
    }

    saveCourse() {
        axios.post('http://localhost:5000/api/saveEditCourse', {
            title: this.state.title,
            imgURL: this.state.imgURL,
            description: this.state.description,
            URLToCourse: this.state.URL,
            courseId: this.props.params.courseid,
        }).then((response) => {
            if(response.data.success === true) {
                hashHistory.push('/');
            } if(response.data.success === false) {
                this.setState({canSubmit:true});
            }
        })
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
        fetch('http://localhost:5000/api/saveCourse', init)
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
                <Paper className='paperEditorContent' zDepth={1}>

                    <Formsy.Form
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        className='courseEditorTextFieldsContainer'>

                        <FormsyText
                            name="Titel"
                            validationError="Verplicht"
                            required
                            hintText="Titel van de cursus"
                            value={this.state.title}
                            floatingLabelText="Titel"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            underlineFocusStyle={styles.underlineStyle}

                            updateImmediately
                            onChange={function (event) {
                                this.courseTitleChange(event);
                            }.bind(this)}
                        />
                        <FormsyText
                            name="Korte beschrijving"
                            validationError="Verplicht"
                            required
                            value={this.state.description}
                            hintText="Korte beschrijving van de cursus"
                            floatingLabelText="Korte beschrijving"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            underlineStyle={styles.underlineStyle}
                            multiLine={true}
                            rows={2}

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
                            value={this.state.imgURL}
                            hintText="http://www.placekitten.com/640/380"
                            floatingLabelText="Plaatje van de cursus"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}

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
                            value={this.state.URL}
                            floatingLabelText="URL naar de cursus"
                            hintText="http://www.example.com"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            underlineStyle={styles.underlineStyle}


                            updateImmediately
                            onChange={function (event) {
                                this.courseURLChange(event);
                            }.bind(this)}
                        />
                    </Formsy.Form>


                    <div className='editorContainer'>
                        <RaisedButton onClick={this.saveCourse} primary={true} className='publishCourseButtonEditor'
                                      label='cursus opslaan' disabled={!this.state.canSubmit}/>
                        <RaisedButton label="verwijder cursus" onClick={this.deleteCourse}
                                      labelColor='#e53935'
                                      className='removeChapterButtonColor'/>
                    </div>
                </Paper>
            </div>
        )
    }
}