import React, {Component} from 'react';
import * as styles from '../styles';
import customTheme from '../customMuiTheme';
import {FlatButton, RaisedButton} from "material-ui";
import {IndexLink} from 'react-router';
import PropTypes from 'prop-types';
import logo from '../images/roc-dev-logo.png';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Hero/>
                <HomePurpose/>
                <About/>
                <HomePurpose/>
            </div>
        )
    }
}



class About extends Component {
    render() {
        return (
            <div className="aboutCardsContainer">
                <CardComponent refToPath='/about/me' imgUrl={'http://lorempixel.com/1920/1080/sports/'}
                               title={'Hi world'}/>
                <CardComponent refToPath='/about/me' imgUrl={'http://lorempixel.com/1920/1080/fashion/'}
                               title={'Hi world'}/>
                <CardComponent refToPath='/about/me' imgUrl={'http://lorempixel.com/1920/1080/cats/'}
                               title={'Hi world'}/>
            </div>
        )
    }
}
class CardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <IndexLink to={this.props.refToPath}>
                <div className="aboutCardsComponentContainer">
                    <h2 className='cardComponentTitle'>{this.props.title}</h2>
                    <img src={this.props.imgUrl} className='cardComponentImg'/>
                </div>
            </IndexLink>
        )
    }
}
CardComponent.propTypes = {
    refToPath: PropTypes.string,
    title: PropTypes.string,
    imgUrl: PropTypes.string,
}