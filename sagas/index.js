import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';

axios.defaults.baseURL = 'http://52.198.52.213';

export default function* rootSaga() {
  yield all([fork(user)]);
}
