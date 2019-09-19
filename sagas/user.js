import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router';

import { cleanNullArgs } from '../common/cleanNullArgs';
import { getCookie, deleteCookie } from '../common/cookie';

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
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  WITHDRAW_USER_REQUEST,
  WITHDRAW_USER_SUCCESS,
  WITHDRAW_USER_FAILURE,
} from '../reducers/user';

// EDIT_USER
function editAPI({ pk, password, imgProfile, email, nickname, phoneNumber }) {
  const data = cleanNullArgs({ password, imgProfile, email, nickname, phoneNumber });
  console.log(111, phoneNumber)
  const token = getCookie('token');
  return axios.patch(
    `https://study-watson.lhy.kr/api/v1/members/${pk}/`,
    {
      ...data,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  );
}

function* edit(action) {
  try {
    const result = yield call(editAPI, action.data);
    console.log(111,result)
    const { pk, phoneNumber, imgProfile, nickname, email } = result.data;
    yield put({
      type: EDIT_USER_SUCCESS,
      data: {
        pk,
        phoneNumber,
        imgProfile,
        nickname,
        email,
      },
    });
    Router.pushRoute('/profile');
  } catch (error) {
    console.log(error.response.data);
    alert('수정에 실패하였습니다.');
    yield put({
      type: EDIT_USER_FAILURE,
    });
  }
}

function* watchEdit() {
  yield takeEvery(EDIT_USER_REQUEST, edit);
}

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
    const { pk, username, email, phoneNumber, nickname } = result.data.user;
    const { key } = result.data;
    document.cookie = `token=${key}; path=/`;
    document.cookie = `pk=${pk}; path=/`;
    yield put({
      type: LOG_IN_SUCCESS,
      data: {
        pk,
        username,
        email,
        phoneNumber,
        nickname,
      },
    });
    Router.pushRoute('/');
  } catch (e) {
    console.error(e.response);
    alert('입력하신 아이디/비밀번호에 해당하는 계정이 없습니다.');
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// LOAD_USER
function loadUserAPI({ key }) {
  return axios.get('https://study-watson.lhy.kr/api/v1/members/profile/', {
    headers: { Authorization: `Token ${key}` },
  });
}

function* loadUser(action) {
  try {
    if (action.key) {
      const result = yield call(loadUserAPI, action);
      const {
        pk,
        username,
        email,
        phoneNumber,
        imgProfile,
        nickname,
      } = result.data;
      yield put({
        type: LOAD_USER_SUCCESS,
        data: {
          pk,
          username,
          email,
          phoneNumber,
          imgProfile,
          nickname,
        },
      });
    } else {
      yield put({
        type: LOAD_USER_FAILURE,
      });
    }
  } catch (error) {
    console.log(error);
    deleteCookie('token');
    deleteCookie('pk');
    yield put({
      type: LOAD_USER_FAILURE,
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
  nickname,
}) {
  return axios.post('https://study-watson.lhy.kr/api/v1/members/', {
    username,
    password1,
    password2,
    type,
    email,
    phoneNumber,
    nickname,
  });
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    const { token } = result.data;
    const { pk, email, phoneNumber, username, nickname } = result.data.user;
    yield put({
      type: SIGN_UP_SUCCESS,
      data: {
        pk,
        email,
        phoneNumber,
        username,
        nickname,
      },
    });
    document.cookie = `token=${token}; path=/`;
    document.cookie = `pk=${pk}; path=/`;
    Router.pushRoute('/signupend');
  } catch (error) {
    console.log(error.response.data);
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
    deleteCookie('token');
    deleteCookie('pk');
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    window.location.href = '/';
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

// WITHDRAW
function withDrawAPI({ pk }) {
  const token = getCookie('token');
  return axios.delete(`https://study-watson.lhy.kr/api/v1/members/${pk}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
}

function* withDraw(action) {
  try {
    const result = yield call(withDrawAPI, action.data);
    console.log(result);
    yield put({
      type: WITHDRAW_USER_SUCCESS,
    });
    deleteCookie('token');
    deleteCookie('pk');
    Router.pushRoute('/');
  } catch (e) {
    console.error(e);
    alert('탈퇴에 실패하였습니다.');
    yield put({
      type: WITHDRAW_USER_FAILURE,
    });
  }
}
function* watchWithDraw() {
  yield takeEvery(WITHDRAW_USER_REQUEST, withDraw);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchEdit),
    fork(watchWithDraw),
  ]);
}
