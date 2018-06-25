import React, { Component } from 'react';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';

class Home extends Component {
  render() {
    const { sayHello } = this.props;
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Home;