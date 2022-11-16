const SAVE_PLAYER = 'SAVE_PLAYER';
const ADD_SCORE = 'ADD_SCORE';
const CLEAR_SCORE = 'CLEAR_SCORE';
const CUSTOMIZE_API = 'CUSTOMIZE_API';

const savePlayer = (name, email) => ({
  type: SAVE_PLAYER,
  name,
  email,
});

const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

const customizedApi = (amount = Number('5'), category, difficulty, questionType) => ({
  type: CUSTOMIZE_API,
  amount,
  category,
  difficulty,
  questionType,
});

const clearScore = () => ({
  type: CLEAR_SCORE,
});

export { SAVE_PLAYER, savePlayer, ADD_SCORE, addScore, CLEAR_SCORE,
  clearScore, customizedApi, CUSTOMIZE_API };
