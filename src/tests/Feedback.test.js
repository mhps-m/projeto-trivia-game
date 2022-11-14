import { screen } from  "@testing-library/react";
import userEvent from  "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from  '../App'
import renderWithRouterAndRedux from  './helpers/renderWithRouterAndRedux';
import { questionsResponse } from  "./mocks/questions";

describe('testa a página de Feedbacks', () => {
  test('se os elementos são renderizados corretamente', async() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(questionsResponse),
  });
const {history} = renderWithRouterAndRedux(<App  />);
const  nameInput  =  screen.getByPlaceholderText('Nome');
const  emailInput  =  screen.getByPlaceholderText('E-mail');
const  loginButton  =  screen.getByRole('button', { name:  'Play' });
userEvent.type(nameInput, 'José');
userEvent.type(emailInput, 'jose@trybe.com')
userEvent.click(loginButton);


const  imgGravatar  = await  screen.findByRole('img');
expect(imgGravatar).toBeInTheDocument();

const  firstCorrectAnswer  =  await  screen.findByTestId('correct-answer');
userEvent.click( firstCorrectAnswer);
const  firstNextButton  =  await  screen.findByTestId('btn-next');
userEvent.click(firstNextButton);

const  secondCorrectAnswer  =  await  screen.findByTestId('correct-answer');
userEvent.click( secondCorrectAnswer);
const  secondNextButton  =  await  screen.findByTestId('btn-next');
userEvent.click(secondNextButton);

const  thirdCorrectAnswer  =  await  screen.findByTestId('correct-answer');
userEvent.click( thirdCorrectAnswer);
const  thirdNextButton  =  await  screen.findByTestId('btn-next');
userEvent.click(thirdNextButton);

const  fourthCorrectAnswer  =  await  screen.findByTestId('correct-answer');
userEvent.click(fourthCorrectAnswer);
const  fourthNextButton  =  await  screen.findByTestId('btn-next');
userEvent.click(fourthNextButton);

const  WrongtAnswer  =  await  screen.findAllByTestId(/wrong-answer-/i);
userEvent.click( WrongtAnswer[0]);
const  fifthNextButton  =  await  screen.findByTestId('btn-next');
userEvent.click(fifthNextButton);

const dataName = await screen.findByTestId('header-player-name')
expect(dataName).toHaveTextContent(/josé/i)
expect(dataName).toBeInTheDocument();

const  dataImg  =  await  screen.findByTestId('header-profile-picture');
expect(dataImg).toBeInTheDocument();

const  dataScore  =  await  screen.findByTestId('header-score');
expect(dataScore).toHaveTextContent(250)
expect(dataScore).toBeInTheDocument();

const  dataTotalScore  =  await  screen.findByTestId('feedback-total-score');
expect(dataTotalScore).toHaveTextContent(250)
expect(dataTotalScore).toBeInTheDocument();

const  dataFeedbackText  =  await  screen.findByTestId('feedback-text');
expect(dataFeedbackText).toHaveTextContent(/well done!/i)
expect(dataFeedbackText).toBeInTheDocument();

const btnRanking = await screen.findByTestId('btn-ranking');
expect(btnRanking).toBeInTheDocument()
userEvent.click(btnRanking);

const btnHome = await screen.findByTestId('btn-go-home');
userEvent.click(btnHome);

await act(async ()=>
history.push('/feedback')
)

const btnPlayAgain = await screen.findByTestId('btn-play-again')
expect(btnPlayAgain).toBeInTheDocument()
userEvent.click(btnPlayAgain);

})


test('Se aparece mensagem "Could be better..." para o jogador que acertou menos de 3 questões', () => {
  const initialState = {
    player: {
      name: 'José',
      email: 'josé@tryber.com',
      assertions: 2,
      score: 20,
    }
  }

  renderWithRouterAndRedux(<App />, initialState, '/feedback');

  const feedbackText = screen.getByTestId('feedback-text');
  expect(feedbackText).toHaveTextContent('Could be better...')
})
})