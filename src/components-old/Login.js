import React from 'react';
import * as styles from '../styles';
import {FlatButton} from "material-ui";


export default class Login extends React.Component {
    render() {
        return (
            <a href="http://localhost:5000/auth/google"><FlatButton label='LOGIN' className='appbarButtonNotLoggedIn'/></a>
        )
    }
}