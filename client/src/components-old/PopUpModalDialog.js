import React, {Component} from 'react';
import {Dialog, FlatButton} from "material-ui";
import * as styles from "../styles";
import PropTypes from 'prop-types';

export default class PopUpModalDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({modalOpen: true});
    }

    handleClose() {
        this.setState({modalOpen: false});
    }

    render() {
        return (

            <div>
                <FlatButton label='verwijder cursus'
                            className='removeChapterButtonColor'
                            onTouchTap={this.handleOpen}/>
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
                                className='removeChapterButtonColor'
                                primary={true}
                                onTouchTap={this.handleClose}
                                onClick={function () {
                                    console.log(this.props


                                        .dataItem._id, this.props.index);
                                    this.props.removeCourse(this.props.dataItem._id, this.props.index);
                                }.bind(this)}
                            />
                        </div>
                    }
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}>
                </Dialog>
            </div>
        )
    }
}

PopUpModalDialog.propTypes = {
    dataItem: PropTypes.object,
}