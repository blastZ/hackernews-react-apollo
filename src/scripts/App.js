import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncComponent } from './utils/asyncComponent';
import { hot } from 'react-hot-loader';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={asyncComponent(() => import('./home'))} />
      </Switch>
    )
  }
}

export default hot(module)(App);