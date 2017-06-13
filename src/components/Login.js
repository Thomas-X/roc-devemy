import React from 'react';
import * as styles from '../styles';
import {FlatButton} from "material-ui";


export default class Login extends React.Component {
    render() {
        return (
            <a href="/auth/google"><FlatButton label='LOGIN' style={styles.appbarButtonNotLoggedIn}/></a>
        )
    }
}