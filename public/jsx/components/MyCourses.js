import React, {Component} from 'react';
import {CircularProgress, Dialog, FlatButton, Paper} from "material-ui";
import * as styles from "../styles";
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {hashHistory} from "react-router";

import {TransitionGroup, CSSTransitionGroup} from 'react-transition-group';

export default class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: null,
        }
    }


    componentDidMount() {
        axios.get('/api/authUser').then(function (response) {

            response = JSON.parse(response['data']);

            if (response.success == false) {
                hashHistory.push('/');
            }
        }.bind(this));
        axios.get('/api/myCourses').then(function (response) {
            var data = JSON.parse(response['data']);
            this.setState({
                data: data,
                loaded: true,
            });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Paper style={styles.paperEditorContent} zDepth={1}>
                    {this.state.loaded ? <MyCoursesData data={this.state.data}/> :
                        <CircularProgress size={80} thickness={5}/>}
                </Paper>
            </div>
        )
    }
}

class MyCoursesData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.data,
            modalOpen: false,
        }
        this.removeCourse = this.removeCourse.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({modalOpen: true});
    }

    handleClose() {
        this.setState({modalOpen: false});
    }

    removeCourse(id, index) {
        var init = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
            }),
        };
        fetch('/api/removeCourse', init)
            .then(function (response) {
                    if (response.status == 200) {
                        this.state.data.splice(index, 1);
                        this.setState(this.state);
                    }
                }.bind(this)
            );
    }

    render() {
        let actions = null;

        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip="De titel">Titel</TableHeaderColumn>
                            <TableHeaderColumn tooltip="De beoordeling">Beoordeling</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Totaal aantal commentaar">Commentaar</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Verwijderen">Verwijderen</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.state.data.map(function (dataItem, index) {
                            var commentLength = dataItem.comments.length

                            actions = [
                                <FlatButton
                                    label="Nee"
                                    secondary={true}
                                    onTouchTap={this.handleClose}
                                />,
                                <FlatButton
                                    label="Ja"
                                    style={styles.removeChapterButton}
                                    primary={true}
                                    onTouchTap={this.handleClose}
                                    onClick={function () {
                                        this.removeCourse(dataItem._id, index);
                                    }.bind(this)}
                                />,
                            ];

                            return (
                                <TableRow key={index}>
                                    <TableRowColumn>{dataItem.title}</TableRowColumn>
                                    <TableRowColumn>{dataItem.ratingAverage}
                                        (totaal: {dataItem.totalRatingCount})</TableRowColumn>
                                    <TableRowColumn>{commentLength}</TableRowColumn>
                                    <TableRowColumn>
                                        <FlatButton label='verwijder cursus'
                                                    labelStyle={styles.removeChapterButton}
                                                    onTouchTap={this.handleOpen}/>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        }.bind(this))}
                    </TableBody>
                </Table>

                <Dialog
                    title="Deze actie kan niet ongedaan worden, weet je het zeker?"
                    actions={actions}
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}>
                </Dialog>
            </div>
        )
    }
}
MyCourses.propTypes = {
    data: PropTypes.object
}