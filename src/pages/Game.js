import React, { Component } from 'react';
import Header from '../components/Header';
import SettingsButton from '../components/SettingsButton';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <SettingsButton />
        <h1>
          Game
        </h1>
      </div>
    );
  }
}

export default Game;
