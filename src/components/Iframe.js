import React, {Component} from 'react';
import * as styles from '../styles';
import {CircularProgress, Paper} from "material-ui";
import axios from 'axios';

export default class Iframe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loaded: false,
        }
    }

    // this is some sketchy style changing to prevent iFrame from getting some standard styling that normally
    // would be okay to have (padding top for the nav and background image)
    componentWillMount(){
        document.body.style.padding = 0;
        document.body.style.minWidth = 0;
        document.body.style.backgroundImage = 'none';

    }
    componentWillUnmount(){
        document.body.style.padding = null;
        document.body.style.minWidth = null;
        document.body.style.backgroundImage = null;
    }

    componentDidMount() {
        axios.post('/api/iFrameData', {courseId: this.props.params.courseid, userId: this.props.params.userid,}).then((response) => {
            if(response.data.success === true) {
                this.setState({
                    data: response.data.iFrameData,
                    loaded: true,
                })
            }
        })
    }

    render() {
        let date;
        if(this.state.data != null) {
            date = this.state.data.date.substr(0, 10);
        }
        return (
            <div>
            {this.state.loaded ?
                <div style={styles.iFrame}>
                    <Paper style={styles.bannerContainer} zDepth={1}>
                        <div style={styles.certificateAndIframeHeaderTitleContainer}>
                            <i className="fa fa-certificate" style={styles.certificate}></i>
                            <span style={styles.iFrameHeaderTitle}>{this.state.data.title}</span>
                        </div>
                        <img src="/images/roc-dev-logo.png" style={styles.iFrameHeaderLogo}/>
                    </Paper>
                    <div style={styles.iFramedescriptionContainer}>
                        <span>Op {date} heeft {this.state.data.username} {this.state.data.title} succesvol afgerond.</span>
                    </div>
                </div>
            :
                <CircularProgress size={80} thickness={5}/>
            }
            </div>

        )
    }
}