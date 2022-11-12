import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions/playerActions';

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
        border: '3px solid rgb(6, 240, 15)',
      },
      wrong: {
        border: '3px solid red',
      },
    };

    return (
      answers.map((answer, index) => {
        if (answer === correct) {
          return (
            <button
              key={ answer }
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
            type="button"
            data-testid={ `wrong-answer-${index}` }
            style={ isAnswered || timer === 0 ? answerStyles.wrong : {} }
            onClick={ answerQuestion }
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
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return Number('3');
    default:
      return null;
    }
  };

  // Faz rodar um timer que conta de 30 segundos a 0
  timerFunction = () => {
    const ONE_SECOND = 1000;

    const timerId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
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
      <div>
        <h1>
          { timer }
        </h1>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <p data-testid="question-text">
          { question }
        </p>
        <div data-testid="answer-options">
          { mapAnswers(answers, correctAnswer) }
        </div>

        { (isAnswered || timer === 0) && (
          <button
            type="button"
            data-testid="btn-next"
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
    );
  }
}
Question.propTypes = {}.isRequired;

export default connect()(Question);
