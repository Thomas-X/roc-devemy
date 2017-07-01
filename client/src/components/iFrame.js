import React, {Component} from 'react';
import axios from 'axios';
import {Paper} from "material-ui";
import '../iFrame.css';
export default class iFrame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iFrameData: null,
        }
    }

    componentWillMount() {
        axios.post('/api/getiFrameData', {
            userId: this.props.params.userid,
            courseId: this.props.params.courseid
        }).then((response) => {
            if(response.data.iFrameData) {
                this.setState({
                    iFrameData: response.data.iFrameData,
                })
            }
        });
    }




    render() {
        if(this.state.iFrameData != null) {
            let data = this.state.iFrameData;
            data.finishedOn = data.finishedOn.substr(0, 10);

            return (
                <div className="iFrameContainer">
                    <img src={data.imgURL} className="iFrameImage"/>
                    <Paper zDepth={1} className="iFramePaperContainer">
                        <span className="iFrameTitle">
                            {data.title}
                        </span><br/>
                        <span className="iFrameContent">
                            Op {data.finishedOn} heeft {data.username} {data.title} afgemaakt.
                        </span>
                    </Paper>
                </div>
            )
        } else {
            return (
                <pre>404 not found</pre>
            )
        }
    }
}