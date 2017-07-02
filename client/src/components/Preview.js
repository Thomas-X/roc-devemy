import React, {Component} from 'react';
import {Divider, FlatButton, Paper, RaisedButton} from "material-ui";
import {ActionBookmarkBorder, NavigationArrowForward} from "material-ui/svg-icons/index";
import {Rating} from "material-ui-rating";


export default class Preview extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="ViewCourseHeaderContainer">
                    <div className="ViewCourseImageContainer">
                        <img src={this.props.stateProps.imgURL} className="ViewCourseImage"/>
                    </div>
                </div>
                <Paper className="paperViewCourseContainer" zDepth={1}>
                    <span className="ViewCourseCourseTitle">{this.props.stateProps.title}</span>
                    <div className="ViewCourseTitleAndAuthorEmailContainer">
                        <div>
                            <span
                                className="ViewCourseCourseAuthor">Cursus gemaakt door: {this.props.siteData.displayName}</span>
                            <br/>
                            <i>
                        <span className="ViewCourseCourseAuthorSmallText">
                            ({this.props.siteData.email})
                        </span>
                            </i>
                        </div>
                        <div className="FollowButtons">

                            <RaisedButton
                                labelPosition="before"
                                primary={true}
                                label='Naar cursus'
                                className='ViewCourseGoToCourse'
                                icon={<NavigationArrowForward/>}
                            />
                            <FlatButton
                                secondary={true}
                                labelPosition="before"
                                label='Cursus volgen'

                                className='followButton'

                                icon={<ActionBookmarkBorder/>}
                            />
                            <Rating
                                max={5}
                                value={2}
                            />
                        </div>
                    </div>
                    <Divider style={{marginTop: 10}}/>
                    <br/>
                    {/* using dangerouslySetInnerHTML here because JSX is escaping the <> tags */}
                    <span className="ViewCourseDescription" dangerouslySetInnerHTML={{__html: this.props.stateProps.description.replace(/(?:\r\n|\r|\n)/g, '<br/>')}}>
                    </span>
                </Paper>
            </div>
        )
    }
}