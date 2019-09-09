import React, { Component } from 'react';
import './App.scss';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      sampleBranch: 'Master Branch'
    };
  }
  render() {
    return (
      <p className="sample-branch">{this.state.sampleBranch}</p>
    )
  }
}

export default App;