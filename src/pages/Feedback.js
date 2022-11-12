import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          A
        </h1>
      </div>
    );
  }
}

export default Feedback;
