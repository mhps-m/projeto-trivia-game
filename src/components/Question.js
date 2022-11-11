import React, { Component } from 'react';

class Question extends Component {
  state = {
    isAnswered: false,
    randomSortNumber: 0,
  };

  componentDidMount() {
    const { getRandomSortNumber } = this;
    const randomSortNumber = getRandomSortNumber();
    this.setState({ randomSortNumber });
  }

  // Faz a randomização de um número usado na randomização das respostas e o salva no estado
  getRandomSortNumber = () => Math.random() - Number('0.5');

  // Registra que a questão foi respondida e reseta estado
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
              disabled={ isAnswered }
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
            disabled={ isAnswered }
          >
            { answer }
          </button>
        );
      })
    );
  };

  render() {
    const { mapAnswers, getRandomSortNumber, props: { questionProp, nextQuestion },
      state: { isAnswered, randomSortNumber } } = this;

    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question } = questionProp;

    const answers = [...incorrectAnswers, correctAnswer].sort(() => randomSortNumber);

    return (
      <div>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <p data-testid="question-text">
          { question }
        </p>
        <div data-testid="answer-options">
          { mapAnswers(answers, correctAnswer, isAnswered) }
        </div>

        { isAnswered && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              nextQuestion();
              this.setState({
                isAnswered: false,
                randomSortNumber: getRandomSortNumber(),
              });
            } }
          >
            Next
          </button>)}
      </div>
    );
  }
}

Question.propTypes = {}.isRequired;

export default Question;
