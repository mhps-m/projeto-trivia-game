import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearScore } from '../redux/actions/playerActions';
import convertToMD5 from '../service/gravatarApi';
import '../styles/feedback.css';
import triviaImage from '../styles/img/logo trivia.png';

class Feedback extends Component {
  render() {
    const { score, assertions, history, dispatch, gravatarEmail } = this.props;
    const convertedEmail = convertToMD5(gravatarEmail);
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertedEmail}`;
    return (
      <div className="main__feedback">
        <img src={ triviaImage } alt="Trivia Logo" className="trivia__image" />
        <div className="div__result">
          <div className="gravatar__img">
            <img
              src={ gravatarUrl }
              alt="gravatar"
              className="trivia__image"
              style={
                assertions >= Number('3')
                  ? { borderColor: 'green',
                    boxShadow: '0px 0px 9px #2FC18C',
                  } : {
                    borderColor: 'red',
                    boxShadow: '0px 0px 9px #EA5D5D',
              }
              }
            />
          </div>
          <div className="div__feedback">
            <h1
              data-testid="feedback-text"
              style={
                assertions >= Number('3')
                  ? { color: 'green' } : { color: 'red' }
              }
            >
              {assertions >= Number('3') ? 'Well Done!' : 'Could be better...'}
            </h1>
            <p>
              {`You got ${assertions} questions rigth!`}
            </p>
            <p data-testid="feedback-total-score">
              {`Your score is ${score} points `}
            </p>

          </div>
        </div>
        <div className="btn__feedback">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              history.push('/');
              dispatch(clearScore());
            } }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
        <footer className="footer" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
