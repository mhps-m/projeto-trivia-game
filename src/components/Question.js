import React, { Component } from 'react';

class Question extends Component {
  state = {
    toogleButton: true,
  };

  // Mapeia as respostas da questão em elementos button
  componentDidMount() {
    this.timer1();
    this.timer2();
  }

  timer1 = () => (
    setTimeout(() => this.setState({ toogleButton: false }), Number('5000'))
  );

  timer2 = () => (
    setTimeout(() => this.setState({ toogleButton: true }), Number('35000'))
  );

  mapAnswers = (answers, correct) => (
    answers.map((answer, index) => {
      const { toogleButton } = this.state;
      if (answer === correct) {
        return (
          <button
            key={ answer }
            type="button"
            data-testid="correct-answer"
            disabled={ toogleButton }
          >
            { answer }
          </button>
        );
      }
      return (
        <button
          key={ answer }
          type="button"
          disabled={ toogleButton }
          data-testid={ `wrong-answer-${index}` }
        >
          { answer }
        </button>
      );
    })
  );

  // Monta o elemento da questão para renderização
  renderQuestion = (questions, mapAnswers) => {
    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question } = questions;
    // Faz o sort aleatório das respostas
    const answers = [...incorrectAnswers, correctAnswer]
      .sort(() => Math.random() - Number('0.5'));
    const answersElement = mapAnswers(answers, correctAnswer);
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
    const { mapAnswers, renderQuestion, props: { question } } = this;
    console.log(question);
    return renderQuestion(question, mapAnswers);
  }
}
Question.propTypes = {}.isRequired;
export default Question;
