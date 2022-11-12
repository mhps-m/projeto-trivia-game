import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePlayer } from '../redux/actions/playerActions';

class Question extends Component {
  state = {
    isAnswered: false,
    timer: 30,
    timerId: 0,
    sortedAnswers: [],
  };

  componentDidMount() {
    const { timerFunction, difficultyValue,
      handleAnswers } = this;
    difficultyValue();
    timerFunction();
    handleAnswers();
  }

  componentDidUpdate() {
    const { state: { isAnswered, timer, timerId } } = this;

    // Para o timer ao chegar a 0 ou ao responder uma pergunta
    if (timer === 0 || isAnswered) {
      clearInterval(timerId);
    }
  }

  handleAnswers = () => {
    const { props: { questionProp }, timerFunction, difficultyValue } = this;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionProp;
    const answers = [...incorrectAnswers, correctAnswer];
    const sortedAnswers = answers.sort(() => Math.random() - Number('0.5'));
    this.setState({ sortedAnswers });
  };

  // Função que retorna determinado valor de acordo com a dificuldade
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

  // Função que calcula a pontuação obtida
  handleScore = (timer, difficulty) => {
    const { props: { name, email, dispatch } } = this;
    const score = Number('10') + (timer * difficulty);
    dispatch(savePlayer(name, email, score, 1));
  };

  // Registra que a questão foi respondida e reseta estado
  answerQuestion = () => this.setState({ isAnswered: true });

  // Mapeia as respostas da questão em elementos button
  mapAnswers = (answers, correct) => {
    const { answerQuestion,
      state: { isAnswered, timer } } = this;
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
                this.handleScore(timer, this.difficultyValue());
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

  render() {
    const { mapAnswers, timerFunction,
      props: { questionProp, nextQuestion },
      state: { isAnswered, timer, sortedAnswers } } = this;

    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question,
    } = questionProp;
    const answers = [...incorrectAnswers, correctAnswer];
    // const randomAnswers = answers.sort(() => Math.random() - Number('0.5'));
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
          { mapAnswers(sortedAnswers, correctAnswer) }
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
              this.handleAnswers();
            } }
          >
            Next
          </button>)}
      </div>
    );
  }
}
Question.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Question);
