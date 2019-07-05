import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router';

import {
  // USER_ATTRIBUTE_CHECK_REQUEST,
  // USER_ATTRIBUTE_CHECK_SUCCESS,
  // USER_ATTRIBUTE_CHECK_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '../reducers/user';

// LOG_IN
function logInAPI({ email, password }) {
  return axios.post('https://study-watson.lhy.kr/api/v1/auth/token/', {
    username: email,
    email,
    password,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log(result);
    const { pk, username, email, phoneNumber } = result.data.user;
    const { key } = result.data;
    localStorage.setItem('token', key);
    yield put({
      type: LOG_IN_SUCCESS,
      data: {
        pk,
        username,
        email,
        phoneNumber,
      },
    });
    Router.pushRoute('/');
  } catch (e) {
    console.error(e);
    alert('로그인에 실패하였습니다.');
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// LOAD_USER
function loadUserAPI(key) {
  return axios.get('https://study-watson.lhy.kr/api/v1/members/profile/', {
    headers: { Authorization: `Token ${key}` },
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.key);
    const { pk, username, email, phoneNumber } = result.data;
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
    localStorage.removeItem('token');
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

// SIGN_UP
function signUpAPI({
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

function* signUp(action) {
  try {
    // const result =
    yield call(signUpAPI, action.data);
    // const { pk, email, phoneNumber, username } = result.data;
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: {
      //   pk,
      //   email,
      //   phoneNumber,
      //   username,
      // },
    });
    Router.pushRoute('/');
  } catch (e) {
    console.error(e);
    alert('회원가입에 실패하였습니다.');
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// LOG_OUT;

function* logOut() {
  try {
    localStorage.removeItem('token');
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    Router.pushRoute('/');
  } catch (e) {
    // console.error(e);
    alert('로그아웃에 실패하였습니다.');
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchLogOut),
  ]);
}
