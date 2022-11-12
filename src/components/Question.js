import React, { Component } from 'react';

class Question extends Component {
  state = {
    isAnswered: false,
    randomSortNumber: 0,
    timer: 30,
    timerId: 0,
  };

  componentDidMount() {
    const { getRandomSortNumber, timerFunction } = this;
    timerFunction();
    this.setState({ randomSortNumber: getRandomSortNumber() });
  }

  componentDidUpdate() {
    const { state: { isAnswered, timer, timerId } } = this;

    // Para o timer ao chegar a 0 ou ao responder uma pergunta
    if (timer === 0 || isAnswered) {
      clearInterval(timerId);
    }
  }

  // Faz a randomização de um número usado na randomização das respostas e o salva no estado
  getRandomSortNumber = () => (
    Math.random() > Number('0.5') ? Number('1') : Number('-1')
  );

  // Registra que a questão foi respondida e reseta estado
  answerQuestion = () => this.setState({ isAnswered: true });

  // Mapeia as respostas da questão em elementos button
  mapAnswers = (answers, correct) => {
    const { answerQuestion, state: { isAnswered, timer } } = this;

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
              onClick={ answerQuestion }
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
    const { mapAnswers, getRandomSortNumber, timerFunction,
      props: { questionProp, nextQuestion },
      state: { isAnswered, timer, randomSortNumber } } = this;

    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question } = questionProp;

    const answers = [...incorrectAnswers, correctAnswer];
    const randomAnswers = answers.sort(() => randomSortNumber);
    console.log(answers);
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
          { mapAnswers(randomAnswers, correctAnswer) }
        </div>

        { (isAnswered || timer === 0) && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              nextQuestion();
              this.setState({
                isAnswered: false,
                randomSortNumber: getRandomSortNumber(),
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
export default Question;
