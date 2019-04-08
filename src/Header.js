import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component{
    componentDidMount(){
        console.log('did mount',this.props);
    }
    render(){
        return(
            <div className='nav-container'>
            <nav className="main-navigation">
                <div className='container nav-bar flex-row clearfix'>
                <span>Navigation Bar</span>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/slider">Slider</Link></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                </div>
            </nav>
            </div>
        );
    }
}

export default Header;