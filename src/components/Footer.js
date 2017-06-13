import React, {Component} from 'react';

import * as styles from '../styles';

export default class Footer extends Component {
    render() {
        return (
            <div style={styles.footerContainer}>
                <span style={styles.footerTextAboutMe}>Made with ♥ by <a href="https://github.com/Thomas-X/">Thomas-X</a></span>
            </div>
        )
    }
}