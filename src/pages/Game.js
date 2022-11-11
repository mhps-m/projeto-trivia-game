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
    const { state: { questions } } = this;
    const ONE = 1;
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

  render() {
    const { nextQuestion, state: { questions, questionsIndex } } = this;

    return (
      <div>
        <Header />
        <SettingsButton />
        { questions.length && (
          <Question
            questionProp={ questions[questionsIndex] }
            nextQuestion={ nextQuestion }
          />
        ) }
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

export default Game;
