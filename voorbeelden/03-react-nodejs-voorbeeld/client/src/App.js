import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tekst: "Dit is de default tekst"
        }
    }
    // componentDidMount() {
    //     axios.get('/mijnDataEindpunt').then((response) => {
    //         this.setState({
    //             tekst: response.data.tekst
    //         })
    //     });
    // }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    {this.state.tekst}
                </p>
            </div>
        );
    }
}

export default App;
