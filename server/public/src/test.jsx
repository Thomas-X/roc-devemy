import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <span>hi world!!</span>
                <img src="https://placekitten.com/640/380"/>
            </div>
        )
    }
}

ReactDOM.render(<Test/>, document.getElementById('root'));