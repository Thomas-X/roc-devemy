import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class MijnEersteComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tekst: this.props.arrayItemTekst,
            tekstIsVeranderd: false,
        }
        this.veranderTekst = this.veranderTekst.bind(this);
    }

    veranderTekst() {
        if (this.state.tekstIsVeranderd) {
            this.setState({
                tekst: this.props.arrayItemTekst,
                tekstIsVeranderd: false
            })
        } else if (!this.state.tekstIsVeranderd) {
            this.setState({
                tekst: "Hey kijk! De tekst is veranderd!",
                tekstIsVeranderd: true,
            });
        }
    }


    render() {
        return (
            <div>
                <span onClick={this.veranderTekst}>{this.state.tekst}</span>
            </div>
        )
    }
}
MijnEersteComponent.propTypes = {
    arrayItemTekst: PropTypes.string.isRequired
};