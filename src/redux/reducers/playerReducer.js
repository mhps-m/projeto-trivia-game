import { SAVE_PLAYER, ADD_SCORE,
  CLEAR_SCORE, CUSTOMIZE_API } from '../actions/playerActions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };

  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };

  case CLEAR_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };

  case CUSTOMIZE_API:
    return {
      ...state,
      isCustomized: true,
      amount: action.amount ? action.amount : 100,
      category: action.category,
      difficulty: action.difficulty,
      questionType: action.questionType,
    };

  default:
    return state;
  }
};

export default playerReducer;
