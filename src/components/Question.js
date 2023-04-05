import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unescape } from 'he';
import { addScore } from '../redux/actions/playerActions';
import triviaImage from '../styles/img/logo trivia.png';
import vectorTime from '../styles/img/vectorTime.png';
import errorImg from '../styles/img/error.png';
import checkImg from '../styles/img/check.png';

class Question extends Component {
  state = {
    isAnswered: false,
    timer: 30,
    timerId: 0,
  };

  componentDidMount() {
    const { timerFunction } = this;

    timerFunction();
  }

  componentDidUpdate() {
    const { state: { isAnswered, timer, timerId }, timerRunout } = this;
    timerRunout(timer, isAnswered, timerId);
  }

  // Registra que a questão foi respondida e reseta estado
  answerQuestion = () => this.setState({ isAnswered: true });

  // Mapeia as respostas da questão em elementos button
  mapAnswers = (answers, correct) => {
    const { answerQuestion, handleScore,
      state: { isAnswered, timer }, props: { dispatch } } = this;

    const answerStyles = {
      correct: {
        filter: 'drop-shadow(0px -1px 16px #2FC18C)',
        backgroundImage: `url(${checkImg})`,
        backgroundSize: '107%',
        backgroundPosition: 'center',
      },
      wrong: {
        filter: 'drop-shadow(0px -1px 16px #e2482f)',
        backgroundImage: `url(${errorImg})`,
        backgroundSize: '109%',
        backgroundPosition: 'center',
      },
    };

    return (
      answers.map((answer, index) => {
        if (answer === correct) {
          return (
            <button
              key={ answer }
              className="btn__answers"
              type="button"
              data-testid="correct-answer"
              style={ isAnswered || timer === 0 ? answerStyles.correct : {} }
              onClick={ () => {
                answerQuestion();
                dispatch(addScore(handleScore()));
              } }
              disabled={ isAnswered || timer === 0 }
            >
              { answer }
            </button>
          );
        }
        return (
          <button
            key={ answer }
            className="btn__answers"
            type="button"
            data-testid={ `wrong-answer-${index}` }
            style={ isAnswered || timer === 0 ? answerStyles.wrong : {} }
            onClick={ () => {
              answerQuestion();
            } }
            disabled={ isAnswered || timer === 0 }
          >
            { answer }
          </button>
        );
      })
    );
  };

  // Soma a pontuação e salva no estado global ao acertar uma questão
  handleScore = () => {
    const { state: { timer }, difficultyValue } = this;
    const TEN = 10;
    return TEN + (timer * difficultyValue());
  };

  // Retorna um valor de acordo com a dificuldade da questão
  difficultyValue = () => {
    const { questionProp: { difficulty } } = this.props;
    const THREE = 3;
    if (difficulty === 'easy') return 1;
    if (difficulty === 'medium') return 2;
    if (difficulty === 'hard') return THREE;
  };

  // Faz rodar um timer que conta de 30 segundos a 0
  timerFunction = () => {
    const ONE_SECOND = 1000;

    const timerId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);

    this.setState({ timerId });
  };

  // Faz a contagem do timer parar ao chegar a 0 ou ao responder a questão
  timerRunout = (timer, isAnswered, timerId) => {
    if (timer === 0 || isAnswered) {
      clearInterval(timerId);
    }
  };

  render() {
    const { mapAnswers, timerFunction,
      props: { questionProp, nextQuestion, answers },
      state: { isAnswered, timer } } = this;
    const { category, correct_answer: correctAnswer, question } = questionProp;
    return (
      <div className="question__container">
        <div
          className="header__question"
        >
          <img
            src={ triviaImage }
            alt="trivia_logo"
            className="trivia__game__img"
          />
          <div
            className="question__category"
          >
            <p
              data-testid="question-category"
              className="question__title"
              style={
                category
                  ? category.includes('Entertainment')
                    ? { backgroundColor: '#00D5E2' }
                    : { backgroundColor: '#F9BA18' }
                  : null
              }
            >
              {category}
            </p>
            <div className="div__question">
              <p data-testid="question-text">
                { unescape(question) }
              </p>
            </div>
            <div className="question__timer">
              <div>
                <img src={ vectorTime } alt="Vector_time" />
                <p
                  data-testid="question-timer"
                >
                  {` Time Remaining: ${timer} `}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="question_answers">
          <div
            data-testid="answer-options"
            className="div__options"
          >
            { mapAnswers(answers, correctAnswer) }
            <div className="div__next__button">
              { (isAnswered || timer === 0) && (
                <button
                  type="button"
                  data-testid="btn-next"
                  className="btn__next"
                  onClick={ () => {
                    nextQuestion();
                    this.setState({
                      isAnswered: false,
                      timer: 30,
                    });
                    timerFunction();
                  } }
                >
                  Next
                </button>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Question.propTypes = {}.isRequired;

export default connect()(Question);
