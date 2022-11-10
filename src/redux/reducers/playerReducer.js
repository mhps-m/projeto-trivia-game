import { SAVE_PLAYER } from '../actions/playerActions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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

  default:
    return state;
  }
};

export default playerReducer;
