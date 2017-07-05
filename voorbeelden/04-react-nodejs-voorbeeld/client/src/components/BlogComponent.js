import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class BlogComponent extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        console.log(this.props);
        return (
            <div className="blogItemContainer">
                {this.props.blogData.titel}
            </div>
        )
    }
}

BlogComponent.propTypes = {
    blogData: PropTypes.object
};