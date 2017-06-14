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


class Hero extends Component {
    render() {
        return (
            <div className="heroContainer">


                <img src={logo} className='heroImage'/> <br/>
                <h2 className='heroTitle'>Roc-Devemy</h2>
                <span className="heroDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                    blanditiis deserunt ex neque omnis possimus quibusdam?</span>
                <div className="heroButtonContainer">
                    <IndexLink to='/info/getStarted'>
                        <RaisedButton
                            className='heroButtonGetStarted'
                            secondary={true}
                            label='GET STARTED'
                            />
                    </IndexLink>
                </div>
            </div>
        )
    }
}

class HomePurpose extends Component {
    render() {
        return (
            <div className='homePurpose'>
                <span className='homePurposeText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusamus, aspernatur atque cumque dolore <strong>doloribus ex fuga illo</strong>incidunt magni natus nemo nostrum
                    numquam <strong>saepe</strong> similique sint tempore, ullam unde voluptas.</span>
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