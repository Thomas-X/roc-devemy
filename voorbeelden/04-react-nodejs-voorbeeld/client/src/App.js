import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import BlogComponent from "./components/BlogComponent";
import VoegBlogToe from "./components/VoegBlogToe";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogData: [],
        }
        this.addBlog = this.addBlog.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllBlogs').then((response) => {
            console.log(response);
            this.setState({
                blogData: response.data.blogData,
            })
        });
    }

    addBlog(titel) {
        axios.post('/addBlog', {titel: titel}).then((response) => {
            if (response.data.newBlogData) {
                this.state.blogData.push(response.data.newBlogData);
                this.setState(this.state);
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="App-intro">
                    {this.state.blogData.map((elem, index) => {
                        return (
                            <BlogComponent blogData={elem} key={index}/>
                        )
                    })}
                    <VoegBlogToe addBlog={this.addBlog}/>
                </div>
            </div>
        );
    }
}

export default App;
