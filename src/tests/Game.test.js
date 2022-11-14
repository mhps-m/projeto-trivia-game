import { act, cleanup, screen, waitFor } from  "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import App from  '../App'
import renderWithRouterAndRedux from  './helpers/renderWithRouterAndRedux';
import { invalidTokenQuestionsResponse, questionsResponse } from  "./mocks/questions";

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
})

describe('testa a página Game', () => {
  test('se o jogador é retornado à página de login caso a requisição para a API volte com response_code 3', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  });
  
  test('se o timer está funcionando corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, {}, '/game');

    const timer = await screen.findByTestId('question-timer');
    expect(timer).toHaveTextContent('30');

    await act(() => wait(4000));
    expect(timer).toHaveTextContent('26');
  })
})