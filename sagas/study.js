import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import Router from 'next/router';
import { cleanNullArgs } from '../common/cleanNullArgs';
import { getCookie } from '../common/cookie';

import {
  ADD_STUDY_REQUEST,
  ADD_STUDY_SUCCESS,
  ADD_STUDY_FAILURE,
  LOAD_STUDIES_REQUEST,
  LOAD_STUDIES_SUCCESS,
  LOAD_STUDIES_FAILURE,
  WITHDRAW_STUDY_REQUEST,
  WITHDRAW_STUDY_SUCCESS,
  WITHDRAW_STUDY_FAILURE,
} from '../reducers/study';

// ADD_STUDY
function addStudyAPI({ category, name, description }) {
  const data = cleanNullArgs({ category, name, description });
  const token = getCookie('token');
  return axios.post(
    `https://study-watson.lhy.kr/api/v1/study/`,
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

function* addStudy(action) {
  try {
    const result = yield call(addStudyAPI, action.data);
    const { category, name, description } = result.data;
    yield put({
      type: ADD_STUDY_SUCCESS,
      data: {
        category,
        name,
        description,
      },
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    console.error(e);
    alert('스터디 추가에 실패했습니다');
    yield put({
      type: ADD_STUDY_FAILURE,
    });
  }
}

function* watchAdd() {
  yield takeEvery(ADD_STUDY_REQUEST, addStudy);
}

// LOAD_STUDIES
function loadStudiesAPI({ token, pk }) {
  return axios.get(
    `https://study-watson.lhy.kr/api/v1/study/members/?user=${pk}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  );
}

function* loadStudies(action) {
  try {
    const result = yield call(loadStudiesAPI, action);
    // const { category, name, description } = result.data;
    yield put({
      type: LOAD_STUDIES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    yield put({
      type: LOAD_STUDIES_FAILURE,
    });
  }
}

function* watchLoadStudies() {
  yield takeEvery(LOAD_STUDIES_REQUEST, loadStudies);
}

// WITHDRAW_STUDY
function withdrawStudyAPI({ token, memberId }) {
  return axios.delete(
    `https://study-watson.lhy.kr/api/v1/study/members/${memberId}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  );
}

function* withdrawStudy(action) {
  try {
    const result = yield call(withdrawStudyAPI, action.data);
    console.log('result', result);
    if (result.status === 204) {
      alert('스터디 탈퇴에 성공하셨습니다.');

      Router.pushRoute(`/`);
    } else {
      alert('스터디 탈퇴에 실패하셨습니다.');
    }
    yield put({
      type: WITHDRAW_STUDY_SUCCESS,
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    alert('스터디 탈퇴에 실패하셨습니다.');
    yield put({
      type: WITHDRAW_STUDY_FAILURE,
    });
  }
}

function* watchWithdrawStudy() {
  yield takeEvery(WITHDRAW_STUDY_REQUEST, withdrawStudy);
}

export default function* StudySaga() {
  yield all([fork(watchAdd), fork(watchLoadStudies), fork(watchWithdrawStudy)]);
}
