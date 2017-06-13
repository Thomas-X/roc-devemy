import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, RaisedButton, Snackbar} from "material-ui";
import {IndexLink} from "react-router";
import * as styles from "../styles";
import PropTypes from 'prop-types';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class FinishedCourseItem extends Component {

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
        // TODO change iFrame src from localhost:7000 to whatever domain this is going to be hosted upon
        return (
            <Card className='finishedCard'>
                <IndexLink to={'/courses/' + this.props.courseData._id} className='cardIndexLink'>
                    <CardMedia
                        overlay={
                            <div className='cardTitleContainer'>
                                <CardTitle
                                    titleStyle={styles.cardTitleStyle}
                                    subtitleStyle={styles.cardSubtitleStyle}
                                    title={this.props.courseData.title}
                                    subtitle={this.props.courseData.author}/>
                            </div>
                        }>
                        <img src={this.props.courseData.imgURL} className='cardImage'/>
                    </CardMedia>
                </IndexLink>
                    <CopyToClipboard text={"<iframe src=\"http://localhost:3000/#/iframe/" + this.props.courseData._id + "/" + this.props.userId + "\" width=\"300\" height=\"192\" frameBorder=\"0\"></iframe>"
                    } onCopy={this.handleToastPopup}>
                        <RaisedButton label='Kopieer iFrame code' primary={true} className='whiteText' fullWidth={true}/>
                    </CopyToClipboard>
                <Snackbar
                    open={this.state.open}
                    message="iFrame code gekopieerd"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </Card>
        )
    }
}
FinishedCourseItem.propTypes = {
    courseData: PropTypes.object
}