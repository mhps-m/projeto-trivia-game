import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import SettingsButton from '../components/SettingsButton';
import { fetchQuestions } from '../service/triviaApi';

class Game extends Component {
  state = {
    questions: [],
    questionsIndex: 0,
  };

  async componentDidMount() {
    const { handleGetQuestions, props: { history } } = this;

    await handleGetQuestions(history);
  }

  // Aumenta o estado questionsIndex por 1, passando para a próxima questão
  nextQuestion = () => {
    const { state: { questions, questionsIndex }, props: { history } } = this;
    const ONE = 1;
    const FOUR = 4;
    if (questionsIndex === FOUR) history.push('/feedback');
    this.setState((prevState) => ({
      questionsIndex:
        prevState.questionsIndex >= (questions.length - ONE)
          ? prevState.questionsIndex
          : prevState.questionsIndex + 1,

    }));
  };

  // Faz a requisição para a api e salva as questões no estado, ou apaga token e retorna à tela de Login em caso de erro
  handleGetQuestions = async (history) => {
    const getQuestions = await fetchQuestions();
    switch (getQuestions) {
    case Number('3'):
      localStorage.clear();
      history.push('/');
      break;
    default:
      this.setState({ questions: getQuestions });
    }
  };

  // Faz a randomização de um número usado na randomização das respostas e o salva no estado
  getRandomSortNumber = () => (
    Math.random() - Number('0.5')
  );

  // Embaralha as respostas e as salvam no estado
  randomizeAnswers = (correctAnswer, incorrectAnswers) => {
    const { getRandomSortNumber } = this;
    return [...incorrectAnswers, correctAnswer].sort(() => getRandomSortNumber());
  };

  render() {
    const { nextQuestion, randomizeAnswers, state: { questions, questionsIndex } } = this;
    const currentQuestion = questions.length
      ? questions[questionsIndex]
      : { incorrect_answers: [], correct_answer: '' };

    const { incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = currentQuestion;

    const randomizedAnswers = randomizeAnswers(correctAnswer, incorrectAnswers);
    return (
      <div>
        <Header />
        <SettingsButton />
        { questions.length
          ? (
            <Question
              questionProp={ currentQuestion }
              nextQuestion={ nextQuestion }
              answers={ randomizedAnswers }
            />
          ) : ''}
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

export default Game;
