import React, {Component} from 'react';
import {CircularProgress, Dialog, FlatButton, Paper, RaisedButton} from "material-ui";
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
import {hashHistory, IndexLink} from "react-router";
import PopUpModalDialog from './PopUpModalDialog';
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
                console.log(response);
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
                            <TableHeaderColumn tooltip="Naar de beheerpagina van de cursus">Beheerpagina</TableHeaderColumn>
                            <TableHeaderColumn tooltip="De cursus aanpassen">Aanpassen</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Verwijderen">Verwijderen</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.state.data.map(function (dataItem, index) {
                            var commentLength = dataItem.comments.length


                            return (
                                <TableRow key={index}>
                                    <TableRowColumn>{dataItem.title}</TableRowColumn>
                                    <TableRowColumn>{dataItem.ratingAverage}
                                        (totaal: {dataItem.totalRatingCount})</TableRowColumn>
                                    <TableRowColumn>{commentLength}</TableRowColumn>
                                    <TableRowColumn>

                                        <IndexLink to={"/teacher/course/" + dataItem._id}>
                                            <RaisedButton primary={true} label='Naar beheerpagina' labelStyle={styles.whiteText}/>
                                        </IndexLink>

                                    </TableRowColumn>
                                    <TableRowColumn>

                                        <IndexLink to={"/courses/edit/" + dataItem._id}>
                                            <RaisedButton
                                                secondary={true}
                                                style={styles.whiteText}
                                                label='Pas cursus aan'
                                            />
                                        </IndexLink>

                                    </TableRowColumn>
                                    <TableRowColumn>

                                        <PopUpModalDialog removeCourse={this.removeCourse} dataItem={dataItem} index={index}/>

                                    </TableRowColumn>
                                </TableRow>
                            )
                        }.bind(this))}
                    </TableBody>
                </Table>


            </div>
        )
    }
}
MyCourses.propTypes = {
    data: PropTypes.object
}