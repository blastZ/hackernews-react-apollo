import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    const { sayHello } = this.props;
    return (
      <div className="home-container">
        <Link to="about" className="link-button">Home To About</Link>
      </div>
    )
  }
}

export default Home;