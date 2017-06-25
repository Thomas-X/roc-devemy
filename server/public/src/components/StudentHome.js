import React, {Component} from 'react';
import Header from "./Header";
import SubText from "./SubText";
import Courses from "./Courses";


export default class StudentHome extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Header siteData={this.props.route.siteData}/>
                <SubText siteData={this.props.route.siteData}/>
                <Courses siteData={this.props.route.siteData}/>
            </div>
        )
    }
}