import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home';
import './index.css';

class Container extends Component {
  sayHello = () => {
    this.props.dispatch({type: 'SAY_HELLO'});
  }

  render() {
    return (
      <div className="home-container">
        <Home />
      </div>
    )
  }
}

const mapStateToProps = ({ homeReducer }) => ({

})


export default connect(mapStateToProps)(Container);