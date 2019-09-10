import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import './App.scss';

const store = configureStore();
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      sampleBranch: 'Master Branch'
    };
  }
  render() {
    return (
      <Provider store={store}>
        <p className="sample-branch">{this.state.sampleBranch}</p>
      </Provider>
    )
  }
}

export default App;