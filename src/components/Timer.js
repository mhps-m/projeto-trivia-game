import React, { Component } from 'react';
import { connect } from 'react-redux';

class Timer extends Component {
  componentDidMount() {
    const { timerFunction } = this.props;
    timerFunction();
  }

  componentDidUpdate() {
    const { timer, isAnswered, timerId, timerRunout } = this.props;
    timerRunout(timer, isAnswered, timerId);
  }

  render() {
    const { timer } = this.props;

    return (
      <h1>
        { timer }
      </h1>
    );
  }
}

mapStateToProps = (state) => ({
  ...state.player,
});

Timer.propTypes = {}.isRequired;

export default connect()(Timer);
