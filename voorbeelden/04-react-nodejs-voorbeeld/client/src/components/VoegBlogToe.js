import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class VoegBlogToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTitel: '',
        }
        this.handleBlogTitelChange = this.handleBlogTitelChange.bind(this);
    }

    handleBlogTitelChange(event) {
        this.setState({
            blogTitel: event.target.value
        })
    }

    render() {
        return (
            <div>
                <input onChange={this.handleBlogTitelChange}/>
                <button onClick={() => {
                    this.props.addBlog(this.state.blogTitel)
                }}>voeg toe</button>
            </div>
        )
    }
}

VoegBlogToe.propTypes = {
    addBlog: PropTypes.func,
}