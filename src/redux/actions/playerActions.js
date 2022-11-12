const SAVE_PLAYER = 'SAVE_PLAYER';

const savePlayer = (name, email, score, assertions) => ({
  type: SAVE_PLAYER,
  name,
  email,
  score,
  assertions,
});

export { SAVE_PLAYER, savePlayer };
