import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import mijnGeimporteedePlaatje from './plaatjes/roc-dev-logo.png';

let mijnBoolean = false;
let mijnArray = [
    {
        tekst: "De tekst die ik wil displayen, bijv van een API"
    },
    {
        tekst: "De tweede tekst die ik wil displayen."
    }
];
/*
 *
 *   Diverse voorbeelden van JSX en het gebruik ervan (Booleans, Arrays, Imports)
 *
 *   className = class (dat is van JSX syntax)
 *   Objects met een key genaamd 'tekst' in een array (mijnArray)
 *
 *
 * */
class App extends Component {
    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="App-intro">
                    {mijnBoolean ? null : mijnArray.map(function(elem, index) {
                        return (
                            <div>
                                <code>
                                    Array item 0{index}: {elem.tekst}
                                </code>
                                <br/>
                            </div>
                        )
                    })}
                    <img src={mijnGeimporteedePlaatje}/>
                </div>
            </div>
        );
    }
}

export default App;
