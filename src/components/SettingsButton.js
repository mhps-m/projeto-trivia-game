import React, { Component } from 'react';
import { AiFillSetting } from 'react-icons/ai';

class SettingsButton extends Component {
  render() {
    const { history } = this.props;

    return (
      <AiFillSetting
        className="settings__button"
        type="button"
        data-testid="btn-settings"
        onClick={ () => history.push('/settings') }
      />
    );
  }
}

SettingsButton.propTypes = {}.isRequired;

export default SettingsButton;
