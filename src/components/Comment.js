import React, {Component} from 'react';
import * as styles from "../styles";
import PropTypes from 'prop-types';
import {IconButton, Menu, MenuItem, Popover} from "material-ui";
import {ActionDeleteForever, ActionReportProblem, NavigationMoreVert} from "material-ui/svg-icons/index";
import axios from 'axios';

export default class Comment extends Component {
    constructor(props) {
        super(props);


        this.state = {
            open: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }


    handleOpen(event) {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    render() {
        var removeAuth = false;

        if(this.props.userId == this.props.comment.authorId) {
            removeAuth = true;
        }

        return (
            <div className='commentContainer'>
                <img src={this.props.comment.authorImage} className='commentUserImage'/>


                <div className='commentDateAndDescriptionContainer'>
                    <div className='authorAndCommentContentContainer'>
                        <strong><span className='commentAuthor'>{this.props.comment.author}</span></strong>
                        <span className='commentContent'>{this.props.comment.comment}</span>
                    </div>


                    <div className='commentMoreAndDateContainer'>
                        <i className='commentDate'><span>Op: {this.props.comment.date}</span></i>
                        <IconButton tooltip='View more' className='commentViewMore' onClick={this.handleOpen}>
                        <NavigationMoreVert/>
                    </IconButton>
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                        targetOrigin={{horizontal: "right", vertical: "top"}}
                        onRequestClose={this.handleClose}
                    >
                        <Menu>
                            {removeAuth ?
                                <MenuItem
                                    primaryText="Delete comment"
                                    leftIcon={<ActionDeleteForever/>}
                                    className='removeChapterButton'
                                    onClick={this.props.removeComment}
                                />
                                :
                                null
                            }
                            <MenuItem primaryText="Report comment" leftIcon={<ActionReportProblem/>} />
                        </Menu>
                    </Popover>
                    </div>
                </div>
            </div>

        )
    }
}
Comment.propTypes = {
    comment: PropTypes.object,
    removeComment: PropTypes.func,
}