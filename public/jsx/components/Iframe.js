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
                        <span>Op {this.state.data.date} heeft {this.state.data.username} {this.state.data.title} succesvol afgerond.</span>
                    </div>
                </div>
            :
                <CircularProgress size={80} thickness={5}/>
            }
            </div>

        )
    }
}