import { screen } from  "@testing-library/react";
import userEvent from  "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from  '../App'
import renderWithRouterAndRedux from  './helpers/renderWithRouterAndRedux';
import { questionsResponse } from  "./mocks/questions";
import Ranking from '../pages/Ranking'

describe('testa a página de Rankings', () => {
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


const imgGravatar  = await  screen.findByRole('img');
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

const rankingPlayerAssertions = screen.getByTestId('player-assertions-0')
expect(rankingPlayerAssertions).toBeInTheDocument()

const rankingIMG = screen.getByTestId('ranking-title')
  expect(rankingIMG).toBeInTheDocument()

const btnHome = await screen.findByTestId('btn-go-home');
userEvent.click(btnHome);
expect(history.location.pathname).toBe("/")

await act(async ()=>
history.push('/settings')
)

const header = await screen.findByText('Settings')
expect(header).toBeInTheDocument(); 

})

test('Se  página de Rankings está vazia, quando não hà rankings salvos', () => {
  localStorage.clear()
  const {history} = renderWithRouterAndRedux(<Ranking  />);



  
  const rankingTitle = screen.getByRole('heading', {
    name: /rankings/i
  })
  expect(rankingTitle).toBeInTheDocument()
  
  
  const rankingIMG = screen.queryByRole('img', {
    name: /avatar do jogador/i
  })
  expect(rankingIMG).not.toBeInTheDocument()
  
  
  const rankingPlayerName = screen.queryByTestId('player-name-0')
  expect(rankingPlayerName).not.toBeInTheDocument()
  
  
  const rankingPlayerScore = screen.queryByTestId('player-score-0')
  expect(rankingPlayerScore).not.toBeInTheDocument()

})

test('Se  página de Rankings está ordenada corretamente', () => {
  const mocksRankings = [{name: 'Maria', score: 240, assertions: 4, gravatarEmail: 'maria@mariazinha.com'}
  ,{name: 'José', score: 0, assertions: 0, gravatarEmail: 'jose@zezinho.com'}]
  localStorage.setItem('rankings', JSON.stringify(mocksRankings))

  renderWithRouterAndRedux(<Ranking />)

  screen.logTestingPlaygroundURL()

})



})

