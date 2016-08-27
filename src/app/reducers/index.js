import { combineReducers } from 'redux';

import screen from 'app/reducers/screen';
import select from 'app/reducers/select';

export default combineReducers({
  screen,
  select,
});
