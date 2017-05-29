import React, {Component} from 'react';
import * as styles from "../styles";
import {Card, CardMedia, CardTitle, CircularProgress, IconButton, Paper, TextField} from "material-ui";
import axios from 'axios';
import {IndexLink} from "react-router";
import {ActionAndroid, ToggleStar} from "material-ui/svg-icons/index";

var init = false;

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.state = {
            loading: false,
            courses: null,
            success: null,
            coursesNotNull: false,

        }
    }

    handleSearchInput(event) {
        this.setState({loading: true});
        axios.post('/api/search', {
            searchQuery: event.target.value
        }).then(function (response) {
            if (response.data.success === true) {
                this.setState({
                    loading: false,
                    courses: response.data.courses,
                    success: true,
                    coursesNotNull: true,
                })
            } else if (response.data.success === false) {
                this.setState({
                    success: false,

                })
            }
        }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Paper style={styles.paperEditorContent} zDepth={1}>
                <TextField
                    hintText='Type iets ..'
                    floatingLabelText='Zoek naar een cursus'
                    floatingLabelStyle={styles.floatingLabelStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    autoFocus
                    style={styles.chapterTitleEditor}
                    onChange={function (event) {
                        this.handleSearchInput(event);
                    }.bind(this)}/>
                {this.state.loading ? <CircularProgress size={80} thickness={5}/>
                    : <div>
                        {this.state.coursesNotNull
                            ?
                            <div>
                                {this.state.courses.map(function (course, index) {
                                    console.log(course);
                                    return (
                                        <IndexLink to={"/courses/" + course._id}>
                                            <Card style={styles.card} className='cardMediaItem'>
                                                <CardMedia
                                                    overlay={
                                                        <div style={styles.cardOverlayContainer}>
                                                        <div style={styles.cardTitleContainer}>
                                                            <CardTitle
                                                                titleStyle={styles.cardTitleStyle}
                                                                subtitleStyle={styles.cardSubtitleStyle}
                                                                title={course.title}
                                                                subtitle={course.author}/>
                                                        </div>
                                                            <span style={styles.cardOverlayAvgRating}>
                                                                <span style={styles.cardRatingAvg}>{course.ratingAverage}</span> <ToggleStar style={styles.cardStar}/>
                                                            </span>
                                                        </div>
                                                    }>
                                                    <img src={course.imgURL} style={styles.cardImage}/>
                                                </CardMedia>
                                            </Card>
                                        </IndexLink>
                                    )
                                })}
                            </div>
                            :
                            null
                        }
                    </div>
                }
            </Paper>
        )
    }
}