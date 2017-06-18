import React, {Component} from 'react';
import {FontIcon, Paper, Tab, Tabs} from "material-ui";
import {ActionDashboard, AvEqualizer, MapsPersonPin} from "material-ui/svg-icons/index";


export default class TeacherHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let hasCourses = false;
        if(this.props.route.siteData.ownedData.length > 0) {
            hasCourses = true;
        }

         return (
            <Paper className='paperEditorContentTeacher' zDepth={1}>
                <Tabs>
                    <Tab
                        icon={<ActionDashboard/>}
                        label="mijn cursussen"
                    >
                        <div className="slideContainer">
                            {hasCourses ?
                                <div>
                                    {/*return the teacher's own users*/}
                                </div>
                                :
                                <div>
                                    {/*return greyed out text with 'you have no courses a blue <button> add course </button>'*/}
                                </div>
                            }
                        </div>
                    </Tab>
                    <Tab
                        icon={<AvEqualizer/>}
                        label="statistieken"
                    >
                        <div className="slideContainer">
                            // add stats here
                        </div>
                    </Tab>
                </Tabs>
            </Paper>
        )
    }
}