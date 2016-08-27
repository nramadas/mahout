import * as selectActions from 'app/actions/select';

const DEFAULT = {
  dropdownId: '',
};

export default (state=DEFAULT, action={}) => {
  switch (action.type) {
    case selectActions.TOGGLE_DROPDOWN: {
      const { id } = action.payload;

      return {
        ...state,
        dropdownId: (id && id !== state.dropdownId) ? id : '',
      };
    }
    default: return state;
  }
}
