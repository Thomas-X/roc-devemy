import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, RaisedButton} from "material-ui";
import {IndexLink} from "react-router";
import * as styles from "../styles";
import PropTypes from 'prop-types';

export default class FollowedCourseItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={styles.finishedCard}>
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
                </IndexLink>
                <RaisedButton
                    label='Ga direct naar cursus'
                    labelStyle={styles.whiteText}
                    fullWidth={true}
                    href={this.props.courseData.URLToCourse}
                    primary={true}/>
            </Card>
        )
    }
}
FollowedCourseItem.propTypes = {
    courseData: PropTypes.object
}