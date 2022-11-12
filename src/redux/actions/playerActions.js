const SAVE_PLAYER = 'SAVE_PLAYER';
const ADD_SCORE = 'ADD_SCORE';

const savePlayer = (name, email) => ({
  type: SAVE_PLAYER,
  name,
  email,
});

const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export { SAVE_PLAYER, savePlayer, ADD_SCORE, addScore };
