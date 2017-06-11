import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, RaisedButton} from "material-ui";
import {IndexLink} from "react-router";
import * as styles from "../styles";
import PropTypes from 'prop-types';
import axios from 'axios';

export default class FinishedCourseItem extends Component {

    constructor(props) {
        super(props);
        this.copyIframeGeneratedCode = this.copyIframeGeneratedCode.bind(this);
    }

    copyIframeGeneratedCode() {
        axios.get('/api/getIframeCode').then((response) => {

        });
    }

    render() {
        return (
            <Card style={styles.card}>
                <IndexLink to={'/courses/' + this.props.courseData._id} style={styles.cardIndexLink}>
                    <CardMedia
                        overlay={
                            <div style={styles.cardTitleContainer}>
                                <CardTitle
                                    titleStyle={styles.cardTitleStyle}
                                    subtitleStyle={styles.cardSubtitleStyle}
                                    title={this.props.courseData.title}
                                    subtitle={this.props.courseData.author}/>
                            </div>
                        }>
                        <img src={this.props.courseData.imgURL} style={styles.cardImage}/>
                    </CardMedia>
                    <a href={'/#/iframe/' + this.props.courseData._id + '/' + this.props.userId}>linkAAAAAAAAAAAAAAAAAAAAAA</a>
                    <RaisedButton label='Kopieer iFrame code' primary={true} labelStyle={styles.whiteText} onClick={this.copyIframeGeneratedCode}/>
                </IndexLink>
            </Card>
        )
    }
}
FinishedCourseItem.propTypes = {
    courseData: PropTypes.object
}