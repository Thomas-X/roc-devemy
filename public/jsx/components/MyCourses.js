import React, {Component} from 'react';
import {CircularProgress, FlatButton, Paper} from "material-ui";
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
            console.log(data);
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
        }
        this.removeCourse = this.removeCourse.bind(this);
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
                // do things with response
                if (response.success == true) {
                    for (var i = 0; i < data.length; i++) {
                        if (this.state.data[i].index == index) {
                            data.splice(i, 1);
                            this.setState(this.state);
                            break;
                        }
                    }
                }
            }.bind(this));
    }

    render() {
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
                    <TableBody displayRowCheckBox={false}>
                        <CSSTransitionGroup
                            transitionName="example"
                            component="tbody"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            <TableBody displayRowCheckbox={false}>

                                {this.state.data.map(function (dataItem, index) {
                                    var commentLength = dataItem.comments.length
                                    console.log(dataItem);
                                    return (

                                        <TableRow key={index}>
                                            <TableRowColumn>{dataItem.title}</TableRowColumn>
                                            <TableRowColumn>{dataItem.ratingAverage}
                                                (totaal: {dataItem.totalRatingCount})</TableRowColumn>
                                            <TableRowColumn>{commentLength}</TableRowColumn>
                                            <TableRowColumn><FlatButton label='verwijder cursus'
                                                                        labelStyle={styles.removeChapterButton}
                                                                        onClick={
                                                                            function () {
                                                                                this.removeCourse(dataItem._id, index);
                                                                            }.bind(this)}/></TableRowColumn>
                                        </TableRow>
                                    )
                                }.bind(this))}
                            </TableBody>
                        </CSSTransitionGroup>
                    </TableBody>
                </Table>
            </div>
        )
    }
}
MyCourses.propTypes = {
    data: PropTypes.object
}