import React, { Component } from 'react';
import { connect } from 'react-redux';
import convertToMD5 from '../service/gravatarApi';
import '../styles/header.css';
import vectorPoints from '../styles/img/Vector.png';
import SettingsButton from './SettingsButton';

class Header extends Component {
  render() {
    const { props: { gravatarEmail, name, score, history } } = this;
    const convertedEmail = convertToMD5(gravatarEmail);
    const gravatarUrl = `https://www.gravatar.com/avatar/${convertedEmail}`;

    return (
      <div className="header__container">
        <div className="empty__div" />
        <div className="header__user__info">
          <div>
            <img
              src={ gravatarUrl }
              alt="Avatar do jogador"
              data-testid="header-profile-picture"
            />
            <h3 data-testid="header-player-name">
              { name }
            </h3>
          </div>
          <div>
            <img
              src={ vectorPoints }
              alt="points_img"
              className="header__points"
            />
            <h3 data-testid="header-score">
              {` Score: ${score} `}
            </h3>
          </div>
          <SettingsButton history={ history } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Header.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Header);
