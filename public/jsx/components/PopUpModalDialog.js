import React, {Component} from 'react';
import {Dialog, FlatButton} from "material-ui";
import * as styles from "../styles";


export default class PopUpModalDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        }
    }

        handleOpen() {
        this.setState({modalOpen: true});
    }

    handleClose() {
        this.setState({modalOpen: false});
    }

    render() {
        return (
            <Dialog
                title="Deze actie kan niet ongedaan worden, weet je het zeker?"
                actions={
                    <div>
                        <FlatButton
                            label="Nee"
                            secondary={true}
                            onTouchTap={this.handleClose}
                        />
                        <FlatButton
                            label="Ja"
                            style={styles.removeChapterButton}
                            primary={true}
                            onTouchTap={this.handleClose}
                            onClick={function () {
                                console.log('data in onClick of JA button ',dataItem._id, index);
                                this.removeCourse(dataItem._id, index);
                            }.bind(this)}
                        />
                    </div>}
                modal={false}
                open={this.state.modalOpen}
                onRequestClose={this.handleClose}>
            </Dialog>
        )
    }
}