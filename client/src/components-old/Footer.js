import React, {Component} from 'react';

import * as styles from '../styles';

export default class Footer extends Component {
    render() {
        return (
            <div className='footerContainer'>
                <span className="whiteText">Made with ♥ by <a href="https://github.com/Thomas-X/">Thomas-X</a></span>
            </div>
        )
    }
}