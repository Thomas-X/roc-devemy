import React, {Component} from 'react';
import {RaisedButton} from "material-ui";


export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="NotFoundErrorContainer">
                <div className="NotFoundErrorContentContainer">
                    <img src="https://media3.giphy.com/media/sIIhZliB2McAo/giphy.gif"/><br/>
                    <h2>404 error not found</h2>
                    <RaisedButton primary={true}
                                  label='terug naar home pagina'
                                  to={this.props.route.siteData.role + "/home"
                                  }/>
                </div>
            </div>
        )
    }
}