import React, {Component} from 'react';


export default class SubText extends Component {
    constructor(props) {
        super(props);
    }


    render() {


        if (this.props.siteData.followedCourses != null && this.props.siteData.followedCourses.length > 0) {
            return (
                <div className="StudentHomePageSubText">
                    <span>Hier zijn je gevolgde cursussen:</span>
                </div>
            )
        } else {
            return (
                <div className="StudentHomePageSubText">
                    <span className="StudentHomePageSubTextText">Je hebt nog geen cursussen gevolgd, zoek of klik op een van de
                        cursussen hieronder om er eentje te volgen.</span>
                </div>
            )
        }


    }
}