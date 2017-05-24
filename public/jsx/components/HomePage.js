import React, {Component} from 'react';
import * as styles from '../styles';
import customTheme from '../customMuiTheme';
import {FlatButton, RaisedButton} from "material-ui";
import {IndexLink} from 'react-router';
import PropTypes from 'prop-types';

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
            <div style={styles.heroContainer} className="heroContainer">
                <img src="../images/roc-dev-logo.png" style={styles.heroImage}/> <br/>
                <h2 style={styles.heroTitle}>Roc-Devemy</h2>
                <span style={styles.heroDescription} className="heroDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                    blanditiis deserunt ex neque omnis possimus quibusdam?</span>
                <div style={styles.heroButtonContainer} className="heroButtonContainer">
                    <IndexLink to='/info/getStarted'>
                        <RaisedButton
                            style={styles.heroButtonGetStarted}
                            secondary={true}
                            label='GET STARTED'
                            className='heroButton'/>
                    </IndexLink>
                </div>
            </div>
        )
    }
}

class HomePurpose extends Component {
    render() {
        return (
            <div style={styles.homePurpose}>
                <span style={styles.homePurposeText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusamus, aspernatur atque cumque dolore <strong>doloribus ex fuga illo</strong>incidunt magni natus nemo nostrum
                    numquam <strong>saepe</strong> similique sint tempore, ullam unde voluptas.</span>
            </div>
        )
    }
}
class About extends Component {
    render() {
        return (
            <div style={styles.aboutCardsContainer} className="aboutCardsContainer">
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
                <div style={styles.aboutCardsComponentContainer} className="aboutCardsComponentContainer">
                    <h2 style={styles.cardComponentTitle}>{this.props.title}</h2>
                    <img src={this.props.imgUrl} style={styles.cardComponentImg}/>
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