import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import Slider from './Slider';


class App extends Component{
    render(){
        return(
            <Router>
                <div>
                    <Header />
                    <Route path='/' exact component={Home}/>
                    <Route path='/slider' component={Slider}/>
                </div>
            </Router>

        )
    }
}

export default App;