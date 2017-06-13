import React, {Component} from 'react';
import * as styles from "../styles";
import {RaisedButton, TextField} from "material-ui";
import axios from 'axios';
import * as colors from "../colors";
import * as customMuiTheme from "../customMuiTheme";
import PropTypes from 'prop-types';


export default class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitButtonDisabled: true,
            submitButtonLabel: 'Create comment',
            buttonBgColour: '#ff5722',
        }

        this.commentInput = this.commentInput.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    commentInput(event) {
        var str = event.target.value;

        // if this is not true, it only contains whitespace which we dont accept
        if (str.replace(/\s/g, '').length) {
            this.setState({
                submitButtonDisabled: false,
                textValue: event.target.value,
            })
        } else {
            this.setState({
                submitButtonDisabled: true,
            })
        }
    }

    submitComment() {
        console.log(this.props);
            axios.post('http://localhost:5000/api/createComment', {
                _id: this.props.userId,
                comment: this.state.textValue,
                courseId: this.props.courseId,
                author: this.props.author,
            }).then(function(response) {


                if (response.data.success) {
                    console.log(response.data.newComments);
                    this.props.commentCreated(response.data.newComments);

                    this.setState({
                        buttonBgColour: '#7cb342',
                        submitButtonLabel: 'Success!',
                        textValue: '',
                    })
                } else if (!response.data.success) {
                    this.setState({
                        buttonBgColour: '#e53935',
                        submitButtonLabel: 'Error!!',
                    })
                }

                setTimeout(() => {
                    this.setState({
                        buttonBgColour: '#ff5722',
                        submitButtonLabel: 'Create comment',
                    })
                }, 1000)
            }.bind(this))
    }

    render() {
        return (
            <div className='mCreateCommentContainer'>
                <div className='createCommentContainer'>
                    <img src={this.props.userImage} className='commentUserImage'/>
                    <TextField
                        hintText="Make a comment"
                        multiLine={true}
                        value={this.state.textValue}
                        rows={2}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        onChange={this.commentInput}
                        rowsMax={4}
                    />
                </div>
                <RaisedButton className='createCommentSubmitButton'
                              disabled={this.state.submitButtonDisabled}
                              backgroundColor={this.state.buttonBgColour}
                              onClick={this.submitComment}
                              label={this.state.submitButtonLabel}/>
            </div>
        )
    }
}
CreateComment.propTypes = {
    commentCreated: PropTypes.func,
}