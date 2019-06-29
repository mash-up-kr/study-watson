import { combineReducers } from 'redux';

import user from './user';
import study from './study';

const rootReducer = combineReducers({
  user,
  study,
});

export default rootReducer;
