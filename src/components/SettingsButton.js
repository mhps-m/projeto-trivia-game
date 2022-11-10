import React, { Component } from 'react';

class SettingsButton extends Component {
  render() {
    const { history } = this.props;

    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => history.push('/settings') }
      >
        Configurações
      </button>
    );
  }
}

SettingsButton.propTypes = {}.isRequired;

export default SettingsButton;
