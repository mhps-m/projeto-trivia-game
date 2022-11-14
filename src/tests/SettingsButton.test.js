import { cleanup, screen, waitFor } from  "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import App from  '../App'
import renderWithRouterAndRedux from  './helpers/renderWithRouterAndRedux';
import { questionsResponse } from  "./mocks/questions";

test('se o botão redireciona o usuário para a página Settings', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const settingsButton = screen.getByTestId('btn-settings');
  userEvent.click(settingsButton);

  expect(history.location.pathname).toBe('/settings');
})