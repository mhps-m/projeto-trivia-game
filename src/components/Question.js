import React, { Component } from 'react';

class Question extends Component {
  state = {
    isAnswered: false,
    randomSortNumber: 0,
  };

  componentDidMount() {
    // Faz a randomização de um número usado na randomização das respostas e o salva no estado
    const randomSortNumber = Math.random() - Number('0.5');
    this.setState({ randomSortNumber });
  }

  answerQuestion = () => this.setState({ isAnswered: true });

  // Mapeia as respostas da questão em elementos button
  mapAnswers = (answers, correct, isAnswered) => {
    const { answerQuestion } = this;

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
              style={ isAnswered ? answerStyles.correct : {} }
              onClick={ answerQuestion }
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
            style={ isAnswered ? answerStyles.wrong : {} }
            onClick={ answerQuestion }
          >
            { answer }
          </button>
        );
      })
    );
  };

  // Monta o elemento da questão para renderização
  renderQuestion = (questions, mapAnswers, isAnswered, randomSortNumber) => {
    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question } = questions;

    // Faz o sort aleatório das respostas
    const answers = [...incorrectAnswers, correctAnswer].sort(() => randomSortNumber);

    const answersElement = mapAnswers(answers, correctAnswer, isAnswered);

    return (
      <div>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <p data-testid="question-text">
          { question }
        </p>
        <div data-testid="answer-options">
          { answersElement }
        </div>
      </div>
    );
  };

  render() {
    const { mapAnswers, renderQuestion,
      props: { question }, state: { isAnswered, randomSortNumber } } = this;
    console.log(question);
    return renderQuestion(question, mapAnswers, isAnswered, randomSortNumber);
  }
}

Question.propTypes = {}.isRequired;

export default Question;
