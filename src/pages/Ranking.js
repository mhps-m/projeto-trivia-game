import React, { Component } from 'react';
import convertToMD5 from '../service/gravatarApi';
import '../styles/ranking.css';
import triviaImage from '../styles/img/logo trivia.png';
import vectorPoints from '../styles/img/Vector.png';

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
      const { name, score, gravatarEmail } = ranking;
      const convertedEmail = convertToMD5(gravatarEmail);
      const gravatarUrl = `https://www.gravatar.com/avatar/${convertedEmail}`;

      return (
        <div key={ `name-${index}` } className="div__ranking">
          <div className="div__score">
            <div>
              <img src={ gravatarUrl } alt="Avatar do jogador" />
              <h3 data-testid={ `player-name-${index}` }>
                { name }
              </h3>
            </div>
            <div>
              <img
                src={ vectorPoints }
                alt="points_img"
                className="header__points"
              />
              <h3 data-testid={ `player-score-${index}` }>
                { ` ${score} Points  `}
              </h3>
            </div>
          </div>
        </div>
      );
    })
  );

  render() {
    const { rankingPositions, props: { history }, state: { rankings } } = this;
    return (
      <div className="main__ranking">
        <div className="ranking__list">
          <img src={ triviaImage } alt="Trivia Logo" className="trivia__image" />
          <h1 data-testid="ranking-title">
            Rankings
          </h1>
          <div className="ranking__positions">
            { rankingPositions(rankings) }
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {}.isRequired;

export default Ranking;
