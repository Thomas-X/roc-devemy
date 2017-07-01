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
        if (str !== '') {
            this.setState({loading: true});
            axios.post('/api/search', {
                searchQuery: event.target.value,
                token: this.props.route.siteData.token,
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

        let coursesLength = false;
        if(this.state.courses != null) {
            if (this.state.courses.length > 0) {
                coursesLength = true;
            }
        }

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
                {this.state.loading ? <Loader/>
                    : <div>
                        {this.state.coursesNotNull
                            ?
                            <div className='searchCoursesResultContainer'>
                                {coursesLength ?
                                    this.state.courses.map(function (course, index) {
                                    return (
                                        <IndexLink to={"/student/home/course/" + course._id} key={index}>
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
                                                                <span
                                                                    className='cardRatingAvg'>{course.ratingAverage}</span> <ToggleStar
                                                                className='cardStar'/>
                                                            </span>
                                                        </div>
                                                    }>
                                                    <img src={course.imgURL} className='cardImage'/>
                                                </CardMedia>
                                            </Card>
                                        </IndexLink>
                                    )
                                })
                                :
                                    <div className="LoaderContainer">
                                        <span className="LoaderText">Niks gevonden! Probeer een andere zoekterm.</span>
                                    </div>
                                }
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

class Loader extends Component {
    render() {
        return (
            <div className="LoaderContainer">
                <span className="LoaderText">Aan het zoeken..</span>
                <CircularProgress size={80} thickness={5} className='circularLoader'/>
            </div>
        )
    }
}