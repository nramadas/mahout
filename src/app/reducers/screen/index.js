import * as screenActions from 'app/actions/screen';
import { PAGE_TYPES } from 'lib/constants';

const DEFAULT = PAGE_TYPES.NEW_PROJECT;

export default (state=DEFAULT, action={}) => {
  switch (action.type) {
    case screenActions.GOTO_SCREEN: {
      const { screen } = action.payload;
      return screen;
    }
    default: return state;
  }
}
