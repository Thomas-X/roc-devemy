import React, {Component} from 'react';
import * as styles from "../styles";
import PropTypes from 'prop-types';
import {IconButton, Menu, MenuItem, Popover} from "material-ui";
import {NavigationMoreVert} from "material-ui/svg-icons/index";

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
        return (
            <div style={styles.commentContainer}>
                <img src={this.props.userImage} style={styles.commentUserImage}/>


                <div style={styles.commentDateAndDescriptionContainer}>
                    <div style={styles.authorAndCommentContentContainer}>
                        <strong><span style={styles.commentAuthor}>{this.props.comment.author}</span></strong>
                        <span style={styles.commentContent}>{this.props.comment.comment}</span>
                    </div>


                    <div style={styles.commentMoreAndDateContainer}>
                        <i style={styles.commentDate}><span>Op: {this.props.comment.date}</span></i>
                        <IconButton tooltip='View more' style={styles.commentViewMore} onClick={this.handleOpen}>
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
                            <MenuItem primaryText="Refresh"/>
                            <MenuItem primaryText="Help &amp; feedback"/>
                            <MenuItem primaryText="Settings"/>
                            <MenuItem primaryText="Sign out"/>
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
}