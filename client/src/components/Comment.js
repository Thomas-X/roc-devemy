import React, {Component} from 'react';
import * as styles from "../styles";
import PropTypes from 'prop-types';
import {IconButton, Menu, MenuItem, Popover, Snackbar} from "material-ui";
import {ActionDeleteForever, ActionReportProblem, NavigationMoreVert} from "material-ui/svg-icons/index";
import axios from 'axios';

export default class Comment extends Component {
    constructor(props) {
        super(props);


        this.state = {
            open: false,
            toastOpen: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleToastPopup = this.handleToastPopup.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
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

    handleToastPopup() {
        this.setState({
            toastOpen: false,
        })
    }

    handleRequestClose() {
        this.setState({
            toastOpen: false,
        });
    }

    render() {
        let data = this.props.siteData;
        let commentData = this.props.commentData;
        var removeAuth = false;

        if (data._id == commentData.authorId || this.props.authorId == data._id) {
            removeAuth = true;
        }

        // date formatting, this is ok since its always a set amount of chars (well, till the year 10000)
        let date = commentData.date.substr(0, 10);

        return (
            <div>
                <div className='commentContainer'>
                    <img src={commentData.authorImage} className='commentUserImage'/>


                    <div className='commentDateAndDescriptionContainer'>
                        <div className='authorAndCommentContentContainer'>
                            <strong><span className='commentAuthor'>{commentData.author}</span></strong>
                            {/* using dangerouslySetInnerHTML because JSX is escaping <> tags */}
                            <span className='commentContent' dangerouslySetInnerHTML={{__html: commentData.comment}}>

                            </span>
                        </div>


                        <div className='commentMoreAndDateContainer'>
                            <i className='commentDate'><span>Op: {date}</span></i>
                            <IconButton tooltip='View more' className='commentViewMore' onClick={this.handleOpen}>
                                <NavigationMoreVert/>
                            </IconButton>
                        </div>
                    </div>


                </div>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                    targetOrigin={{horizontal: "right", vertical: "top"}}
                    onRequestClose={this.handleClose}
                    canAutoPosition={true}
                >
                    <Menu>
                        {removeAuth ?
                            <MenuItem
                                primaryText="Delete comment"
                                leftIcon={<ActionDeleteForever/>}
                                className='removeChapterButtonColor'
                                onClick={() => {
                                    this.props.removeComment(commentData._id)
                                }}
                            />
                            :
                            null
                        }
                        <MenuItem
                            primaryText="Report comment"
                            onClick={() => {
                                this.props.handleToastPopup()
                            }}
                            leftIcon={<ActionReportProblem/>}/>

                    </Menu>
                </Popover>
            </div>

        )
    }
}
Comment.propTypes = {
    comment: PropTypes.object,
    removeComment: PropTypes.func,
}