import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Logout extends React.Component {
    render() {
        window.location.replace('/logout');
        return (
            <CircularProgress size={80} thickness={5} />
        )
    }
}