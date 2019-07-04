import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from '../reducers/user';

// LOG_IN
function logInAPI(loginData) {
  return axios.post('/signIn', loginData);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    document.cookie = `token=${result.data.result.token}`;
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_USER_REQUEST,
      data: {
        token: result.data.result.token,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// LOAD_USER
function loadUserAPI({ token }) {
  return axios.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    const { pk, username, email, phoneNumber } = result;
    yield put({
      type: LOAD_USER_SUCCESS,
      data: {
        pk,
        username,
        email,
        phoneNumber,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(SIGN_UP_REQUEST, loadUser);
}

// LOAD_USER_REQUEST
function signInAPI({
  username,
  password1,
  password2,
  type,
  email,
  phoneNumber,
}) {
  return axios.post('https://study-watson.lhy.kr/api/v1/members/', {
    username,
    password1,
    password2,
    type,
    email,
    phoneNumber,
  });
}

function* signIn(action) {
  try {
    console.log(111);
    const result = yield call(signInAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data.result,
    });
  } catch (e) {
    console.log(22);
    // console.error(e);
    alert('회원가입에 실패하였습니다.');
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(LOAD_USER_REQUEST, signIn);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLoadUser), fork(watchSignUp)]);
}
