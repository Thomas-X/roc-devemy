import React, {Component} from 'react';
import {Card, CardMedia, CardTitle} from "material-ui";
import {IndexLink} from "react-router";
import * as styles from "../styles";
import PropTypes from 'prop-types';

export default class CourseItem extends Component {

    constructor(props) {
        super(props);
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
                </IndexLink>
            </Card>
        )
    }
}
CourseItem.propTypes = {
    courseData: PropTypes.object
}