import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Título
        </h1>
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
