import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// import {
//   LOAD_USER_FAILURE,
//   LOAD_USER_REQUEST,
//   LOAD_USER_SUCCESS,
//   LOG_IN_FAILURE,
//   LOG_IN_REQUEST,
//   LOG_IN_SUCCESS,
// } from '../reducers/user';

// function logInAPI(loginData) {
//   // 서버에 요청을 보내는 부분
//   return axios.post('/signIn', loginData);
// }

// function* logIn(action) {
//   try {
//     const result = yield call(logInAPI, action.data);
//     document.cookie = `token=${result.data.result.token}`;
//     yield put({
//       // put은 dispatch 동일
//       type: LOG_IN_SUCCESS,
//       data: result.data,
//     });
//     yield put({
//       type: LOAD_USER_REQUEST,
//       data: {
//         token: result.data.result.token,
//       },
//     });
//   } catch (e) {
//     // loginAPI 실패
//     console.error(e);
//     yield put({
//       type: LOG_IN_FAILURE,
//     });
//   }
// }

// function* watchLogIn() {
//   yield takeEvery(LOG_IN_REQUEST, logIn);
// }

// function loadUserAPI({ token }) {
//   // 서버에 요청을 보내는 부분
//   return axios.get('/users/me', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }

// function* loadUser(action) {
//   try {
//     // yield call(loadUserAPI);
//     const result = yield call(loadUserAPI, action.data);
//     yield put({
//       // put은 dispatch 동일
//       type: LOAD_USER_SUCCESS,
//       data: result.data.result,
//     });
//   } catch (e) {
//     // loginAPI 실패
//     console.error(e);
//     yield put({
//       type: LOAD_USER_FAILURE,
//       error: e,
//     });
//   }
// }

// function* watchLoadUser() {
//   yield takeEvery(LOAD_USER_REQUEST, loadUser);
// }

export default function* userSaga() {
  // yield all([fork(watchLogIn), fork(watchLoadUser)]);
}
