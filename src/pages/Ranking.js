import React, { Component } from 'react';
import convertToMD5 from '../service/gravatarApi';
import '../styles/ranking.css';

class Ranking extends Component {
  state = {
    rankings: [],
  };

  componentDidMount() {
    const { sortByScore } = this;
    const rankings = JSON.parse(localStorage.rankings || '[]');
    const sortedRankings = sortByScore(rankings);
    this.setState({ rankings: sortedRankings });
  }

  // Faz a ordenação dos rankings por maior pontuação
  sortByScore = (rankings) => {
    const sortedRankings = rankings.sort((a, b) => b.score - a.score);
    return sortedRankings;
  };

  // Renderiza rankings de jogadores
  rankingPositions = (rankings) => (
    rankings.map((ranking, index) => {
      const { name, score, assertions, gravatarEmail } = ranking;
      const convertedEmail = convertToMD5(gravatarEmail);
      const gravatarUrl = `https://www.gravatar.com/avatar/${convertedEmail}`;

      return (
        <div key={ `name-${index}` }>
          <img src={ gravatarUrl } alt="Avatar do jogador" />
          <h3 data-testid={ `player-name-${index}` }>
            { name }
          </h3>
          <h3 data-testid={ `player-score-${index}` }>
            { score }
          </h3>
          <h3 data-testid={ `player-assertions-${index}` }>
            { `Quantidade de acertos: ${assertions}` }
          </h3>
        </div>
      );
    })
  );

  render() {
    const { rankingPositions, props: { history }, state: { rankings } } = this;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Rankings
        </h1>
        { rankingPositions(rankings) }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {}.isRequired;

export default Ranking;
