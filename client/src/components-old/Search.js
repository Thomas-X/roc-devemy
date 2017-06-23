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
        var str = event.target.value;
        if(str !== '') {
            this.setState({loading: true});
            axios.post('http://localhost:5000/api/search', {
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
                        courses: [],
                    })
                }
            }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            this.setState({
                loading: false,
                coursesNotNull: false,
            })
        }
    }

    render() {
        return (
            <Paper className='paperEditorContent' zDepth={1} id="minHeight">
                <TextField
                    hintText='Type iets ..'
                    floatingLabelText='Zoek naar een cursus'
                    floatingLabelStyle={styles.floatingLabelStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    autoFocus
                    onChange={function (event) {
                        this.handleSearchInput(event);
                    }.bind(this)}/>
                <br/>
                {this.state.loading ? <CircularProgress size={80} thickness={5} className='circularLoader'/>
                    : <div>
                        {this.state.coursesNotNull
                            ?
                            <div className='searchCoursesResultContainer'>
                                {this.state.courses.map(function (course, index) {
                                    return (
                                        <IndexLink to={"/courses/" + course._id} key={index}>
                                            <Card id='card' className='cardMediaItem'>
                                                <CardMedia
                                                    overlay={
                                                        <div className='cardOverlayContainer'>
                                                        <div className='cardTitleContainer'>
                                                            <CardTitle
                                                                titleStyle={styles.cardTitleStyle}
                                                                subtitleStyle={styles.cardSubtitleStyle}
                                                                title={course.title}
                                                                subtitle={course.author}/>
                                                        </div>
                                                            <span className='cardOverlayAvgRating'>
                                                                <span className='cardRatingAvg'>{course.ratingAverage}</span> <ToggleStar className='cardStar'/>
                                                            </span>
                                                        </div>
                                                    }>
                                                    <img src={course.imgURL} className='cardImage'/>
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