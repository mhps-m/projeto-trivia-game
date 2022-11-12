import React, { Component } from 'react';
import { connect } from 'react-redux';
import convertToMD5 from '../service/gravatarApi';

class Header extends Component {
  render() {
    const { props: { gravatarEmail, name, score, assertions } } = this;
    const convertedEmail = convertToMD5(gravatarEmail);
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertedEmail}`;

    return (
      <div>
        <img
          src={ gravatarUrl }
          alt="Avatar do jogador"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <h3 data-testid="header-score">
          {score ? `Pontuação: ${score}` : 0}
        </h3>
        <h3>
          {assertions ? `Acertos: ${assertions}` : 0}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Header.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Header);
