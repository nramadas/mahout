export const GOTO_SCREEN = 'SCREEN__GOTO_SCREEN';

export const gotoScreen = screen => ({
  type: GOTO_SCREEN,
  payload: { screen },
});
