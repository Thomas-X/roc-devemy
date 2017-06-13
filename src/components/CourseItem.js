import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, RaisedButton} from "material-ui";
import {IndexLink} from "react-router";
import * as styles from "../styles";
import PropTypes from 'prop-types';

export default class CourseItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card id='card'>
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
                <RaisedButton
                    label='Ga direct naar cursus'
                    className='whiteText'
                    fullWidth={true}
                    href={this.props.courseData.URLToCourse}
                    primary={true}/>
            </Card>
        )
    }
}
CourseItem.propTypes = {
    courseData: PropTypes.object
}