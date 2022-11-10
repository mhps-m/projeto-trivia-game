const SAVE_PLAYER = 'SAVE_PLAYER';

const savePlayer = (name, email) => ({
  type: SAVE_PLAYER,
  name,
  email,
});

export { SAVE_PLAYER, savePlayer };
