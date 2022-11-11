import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import SettingsButton from '../components/SettingsButton';
import { fetchQuestions } from '../service/triviaApi';

class Game extends Component {
  state = {
    questions: [],
    // questionsIndex: 0,
  };

  async componentDidMount() {
    const { handleGetQuestions, props: { history } } = this;
    await handleGetQuestions(history);
  }

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
    const { questions } = this.state;

    return (
      <div>
        <Header />
        <SettingsButton />
        { questions.length && <Question question={ questions[0] } /> }
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

export default Game;
