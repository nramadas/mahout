export const TOGGLE_DROPDOWN = 'SELECT__TOGGLE_DROPDOWN';

export const toggleDropdown = id => ({
  type: TOGGLE_DROPDOWN,
  payload: { id },
});
