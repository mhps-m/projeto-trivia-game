import React, { Component } from 'react';
import { connect } from 'react-redux';
import SettingsButton from '../components/SettingsButton';
import { fetchToken, getToken } from '../service/triviaApi';
import { savePlayer } from '../redux/actions/playerActions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  // Faz o registro do que é digitado nos inputs no estado da página
  handleInput = ({ target: { id, value } }) => this.setState({ [id]: value });

  // Faz a validação dos inputs: nome deve ter mais que dois caracteres, email deve ter formatação "abc@abc.com"
  validateInputs = (name, email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email) && name.trim().length >= 2;
  };

  // Faz a requisição do Token, e em caso de sucesso, salva os dados no localStorage e redireciona à página de jogo
  startPlay = async ({ name, email }, dispatch, history) => {
    const localToken = getToken();
    if (localToken === null) await fetchToken();
    dispatch(savePlayer(name, email));
    history.push('/game');
  };

  render() {
    const { handleInput, validateInputs, startPlay,
      props: { history, dispatch }, state: { name, email } } = this;
    const isDisabled = !validateInputs(name, email);

    return (
      <div>
        <SettingsButton history={ history } />
        <form>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="input-player-name"
              id="name"
              value={ name }
              onChange={ handleInput }
              placeholder="Nome"
            />
          </label>
          <p />
          <label htmlFor="email">
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              value={ email }
              onChange={ handleInput }
              placeholder="E-mail"
            />
          </label>
          <p />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ async () => { await startPlay(this.state, dispatch, history); } }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {}.isRequired;

export default connect()(Login);
