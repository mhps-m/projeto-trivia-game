import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const mockToken = {
  response_code: 0,
  token: 'c327rty23rgt782tr8',
}

describe('testa a página de Login', () => {
  test('se os elementos são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByPlaceholderText('Nome');
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: 'Play' });
    expect(loginButton).toBeInTheDocument();

    const settingsButton = screen.getByRole('button', { name: 'Configurações' });
    expect(settingsButton).toBeInTheDocument();
  })

  test('se o botão de login é habilitado ou desabilitado de acordo com a validação dos campos de input', () => {
    renderWithRouterAndRedux(<App />);
    
    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const loginButton = screen.getByRole('button', { name: 'Play' });

    expect(loginButton).toBeDisabled();

    userEvent.type(nameInput, 'A')
    userEvent.type(emailInput, 'abc@abc')

    expect(loginButton).toBeDisabled();

    userEvent.clear(nameInput);
    userEvent.clear(emailInput);
    userEvent.type(nameInput, 'José');
    userEvent.type(emailInput, 'jose@trybe.com')

    expect(loginButton).toBeEnabled();
  });

  test('se o botão de login redireciona para a página de jogo', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockToken),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const loginButton = screen.getByRole('button', { name: 'Play' });

    userEvent.type(nameInput, 'José');
    userEvent.type(emailInput, 'jose@trybe.com')
    userEvent.click(loginButton);

    const { location: { pathname } } = history;

    expect(fetch).toHaveBeenCalled();

    waitFor(() => expect(pathname).toBe('/game'));
  })
})