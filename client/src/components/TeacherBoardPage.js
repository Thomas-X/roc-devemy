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
import {Checkbox, CircularProgress, Dialog, FlatButton, Paper, RaisedButton, TextField} from "material-ui";
import * as styles from "../styles";
import {hashHistory, IndexLink} from 'react-router';

export default class TeacherBoardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loaded: false,
            noItems: false,
            searchQuery: null,
            searchData: [],
            modalOpen: false,
        }

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.removeAllStudents = this.removeAllStudents.bind(this);

    }

    handleOpen() {
        this.setState({modalOpen: true});
    }

    handleClose() {
        this.setState({modalOpen: false});
    }

    removeAllStudents() {
        axios.post('/api/removeAllStudentsFromCourse', {
            courseId: this.props.params.courseid,
            token: this.props.route.siteData.token,
        }).then((response) => {
            if (response.data.success === true) {
                this.setState({
                    data: null,
                    loaded: true,
                    noItems: true,
                    searchQuery: null,
                    searchData: [],
                })
            } else {
                hashHistory.push(this.props.route.siteData.role + '/home');
            }
        });
    }

    componentDidMount() {
        axios.post('/api/getStudentsFollowingCourse', {
            courseId: this.props.params.courseid,
            token: this.props.route.siteData.token,
        }).then((response) => {
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
        axios.post('/api/finishCourse', {
            notFinished: !user.finishedCourse,
            courseId: this.props.params.courseid,
            user: user,
            token: this.props.route.siteData.token,
        }).then((response) => {

            if (response.data.success === true && response.data.finishedCourse === true) {

                // we have to re calculate the index of data because its a different index from searchData
                this.state.data.forEach((elem, index2) => {
                    if (elem.username.indexOf(user.username) != -1) {
                        this.state.data[index2].finishedCourse = true;
                    }
                });


                this.state.searchData[index].finishedCourse = true;
                this.setState(this.state);
            }
            if (response.data.success === true && response.data.finishedCourse === false) {

                // we have to re calculate the index of data because its a different index from searchData
                this.state.data.forEach((elem, index2) => {
                    if (elem.username.indexOf(user.username) != -1) {
                        this.state.data[index2].finishedCourse = false;
                    }
                });
                if (this.state.searchData[index - 1] != null) this.state.searchData[index - 1].finishedCourse = false;
                else this.state.searchData[index].finishedCourse = false;
                this.setState(this.state);
            }
        })
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
            <Paper className='paperEditorContent' zDepth={1}>

                {this.state.loaded ?
                    <Table
                        height='500'>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip='Zoek naar een specifieke student' colSpan="2">
                                    <TextField
                                        hintText="Search students .."
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        underlineFocusStyle={styles.underlineStyle}
                                        onChange={(event) => {
                                            this.handleSearch(event)
                                        }}
                                    />
                                </TableHeaderColumn>

                                <TableHeaderColumn tooltip='Verwijder alle studenten die de cursus volgen' colSpan="1"
                                                   className='tableRemoveStudents'>
                                    <div className='removeStudentsFromCourseButtonContainer'>
                                        <FlatButton label='verwijder studenten'
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
                                                        onClick={this.removeAllStudents}
                                                    />
                                                </div>
                                            }
                                            modal={false}
                                            open={this.state.modalOpen}
                                            onRequestClose={this.handleClose}>
                                        </Dialog>
                                    </div>
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
                        <div className="TeacherBoardPageNoStudentsFollowedContainer">
                        <span className="TeacherBoardPageNoStudentsFollowed">
                                        Er zijn nog geen studenten die de cursus volgen.
                                    </span>
                            <IndexLink to={this.props.route.siteData.role + '/home'}>
                                <RaisedButton
                                    label="Terug naar thuispagina"
                                    primary={true}
                                    className='TeacherHomeCreateCourseButton'/>
                            </IndexLink>
                        </div>
                        :
                        <CircularProgress size={80} thickness={5} className='circularLoader'/>
                }
            </Paper>
        )
    }
}