import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <h1>
          Sua pontuação final foi:
        </h1>
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <h1>
          Sua quantidade de acertos foi:
        </h1>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        <h1 data-testid="feedback-text">
          A
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
