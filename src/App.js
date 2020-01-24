import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import configureStore from './redux/configureStore';
import './App.scss';
import route from './router';

//export history to access it outside the react component
const history = createBrowserHistory()

const store = configureStore();
class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {
              route.map((route, index)=>
                <Route key={index} exact={route.exact} path={route.path} component={route.component} />
              )
            }
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;