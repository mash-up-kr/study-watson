import { combineReducers } from 'redux';

import user from './user';
import study from './study';
import schedule from './schedule';

const rootReducer = combineReducers({
  user,
  study,
  schedule,
});

export default rootReducer;
