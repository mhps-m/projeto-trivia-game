import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { props: { assertions } } = this;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {assertions >= Number('3') ? 'Well Done!' : 'Could be better...'}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
