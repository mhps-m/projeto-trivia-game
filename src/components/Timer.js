import React, { Component } from 'react';

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

export default Timer;
