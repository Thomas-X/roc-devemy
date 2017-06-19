import React, {Component} from 'react';
import {Parallax} from 'react-parallax';
import {Paper, Tab, Tabs} from "material-ui";
import {ActionAccountCircle, ActionCheckCircle} from "material-ui/svg-icons/index";

export default class AboutMe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabOneSelected: true,
        }
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick() {
        this.setState({
            tabOneSelected: !this.state.tabOneSelected
        })
    }

    render() {

        let data = this.props.route.siteData;
        return (
            <div>
                <div className="AboutMeHeader">
                        <div className="TabsContainer">
                            <Tabs className="AboutMeTabsContainer">
                                <Tab
                                    label='mijn profiel'
                                    onClick={this.handleTabClick}
                                    icon={<ActionAccountCircle/>}
                                >

                                </Tab>
                                <Tab
                                    icon={<ActionCheckCircle/>}
                                    onClick={this.handleTabClick}
                                    label='voltooide cursussen'
                                >

                                </Tab>

                            </Tabs>
                        </div>
                </div>

                {/* profile page */}
                <Paper className="paperEditorContentAboutMe" style={this.state.tabOneSelected ? {display: 'none'} : {display: 'block'}}>
                    <div className="AboutMeDisplayImageContainer">
                        <img src={data.displayImage} className="AboutMeDisplayImage"/>
                    </div>
                    <div className="AboutMeUserNameContainer">
                        <span className="AboutMeUserName">{data.displayName} d dd dd</span>
                    </div>
                </Paper>

                {/* completed course */}
                <Paper className="paperEditorContentAboutMe" style={this.state.tabOneSelected ? {display: 'block'} : {display: 'none'}}>
                    <div className="AboutMeDisplayImageContainer">
                        <img src={data.displayImage} className="AboutMeDisplayImage"/>
                    </div>
                    <div className="AboutMeUserNameContainer">
                        <span className="AboutMeUserName">{data.displayName} asdasdsad</span>
                    </div>
                </Paper>
            </div>
        )
    }
}


