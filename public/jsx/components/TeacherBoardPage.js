import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import axios from 'axios';
import {Checkbox, CircularProgress, Paper, TextField} from "material-ui";
import * as styles from "../styles";
import {hashHistory} from 'react-router';

export default class TeacherBoardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loaded: false,
            noItems: false,
            searchQuery: null,
            searchData: [],
        }

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        axios.post('/api/getStudentsFollowingCourse', {courseId: this.props.params.courseid}).then((response) => {
            if (response.data.authenticated === false) {
                hashHistory.push('/');
            } else {
                if (response.data.success === true) {
                    this.setState({
                        data: response.data.users,
                        searchData: response.data.users,
                        loaded: true,
                        noItems: false,
                    });
                } else if (response.data.success === false) {
                    this.setState({
                        noItems: true,
                    })
                }
            }
        });
    }

    handleRowClick(index, user) {
        let notFinished = null;
        if (user.finishedCourse === true) {
            notFinished = false;
        } else if (user.finishedCourse === false) {
            notFinished = true;
        }
        if (notFinished != null) {
            axios.post('/api/finishCourse', {
                notFinished: notFinished,
                courseId: this.props.params.courseid,
                user: user
            }).then((response) => {

                if (response.data.authenticated === true) {
                    hashHistory.push('/');
                }
                if (response.data.success === true && response.data.finishedCourse === true) {
                    this.state.data[index].finishedCourse = true;
                    this.state.searchData[index].finishedCourse = true;
                    this.setState(this.state);
                }
                if (response.data.success === true && response.data.finishedCourse === false) {
                    this.state.data[index].finishedCourse = false;
                    this.state.searchData[index].finishedCourse = false;
                    this.setState(this.state);
                }
            })
        }
    }

    handleSearch(event) {
        this.state.searchData = [];
        this.state.searchQuery = event.target.value;
        this.state.data.forEach((elem, index) => {
            if (elem.username.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                this.state.searchData.push(elem);
            }
        })
        this.setState(this.state);
    }

    render() {
        return (
            <Paper style={styles.paperEditorContent} zDepth={1}>

                {this.state.loaded ?
                    <Table
                        height='500'>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip='Zoek naar een specifieke student' colSpan="3">
                                    <TextField
                                        hintText="Search students .."
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        underlineFocusStyle={styles.underlineStyle}
                                        onChange={(event) => {
                                            this.handleSearch(event)
                                        }}
                                    />
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                {/* no tool tip because of weird hovering issue*/}
                                <TableHeaderColumn>Klaar met cursus</TableHeaderColumn>
                                <TableHeaderColumn tooltip='De naam van de student'>Naam</TableHeaderColumn>
                                <TableHeaderColumn tooltip='De email van de student'>Email</TableHeaderColumn>

                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.state.searchData.map((user, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableRowColumn>
                                            <Checkbox
                                                checked={user.finishedCourse}
                                                onClick={() => {
                                                    this.handleRowClick(index, user);
                                                }}/>
                                        </TableRowColumn>
                                        <TableRowColumn>{user.username}</TableRowColumn>
                                        <TableRowColumn>{user.email}</TableRowColumn>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    :
                    this.state.noItems ?
                        <h1>Er zijn nog geen studenten die de cursus volgen!</h1>
                        :
                        <CircularProgress size={80} thickness={5} style={styles.loader}/>
                }
            </Paper>
        )
    }
}