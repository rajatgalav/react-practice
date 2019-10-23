import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import './App.scss';
import HomeScreen from './screens/HomeScreen';

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
        <HomeScreen />
      </Provider>
    )
  }
}

export default App;