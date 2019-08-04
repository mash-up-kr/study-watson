import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import Router from 'next/router';
import { cleanNullArgs } from '../common/cleanNullArgs';
import { getCookie } from '../common/cookie';

import {
  ADD_STUDY_REQUEST,
  ADD_STUDY_SUCCESS,
  ADD_STUDY_FAILURE,
  UPDATE_STUDY_REQUEST,
  UPDATE_STUDY_SUCCESS,
  UPDATE_STUDY_FAILURE,
  LOAD_STUDIES_REQUEST,
  LOAD_STUDIES_SUCCESS,
  LOAD_STUDIES_FAILURE,
  LOAD_STUDY_REQUEST,
  LOAD_STUDY_SUCCESS,
  LOAD_STUDY_FAILURE,
  LOAD_STUDY_MEMBERSHIPS_REQUEST,
  LOAD_STUDY_MEMBERSHIPS_SUCCESS,
  LOAD_STUDY_MEMBERSHIPS_FAILURE,
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
    const { data } = result;
    yield put({
      type: ADD_STUDY_SUCCESS,
      data,
    });
    Router.pushRoute(`/studyDetail/${data.pk}`);
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

// UPDATE_STUDY
function updateStudyAPI({ id, category, name, description }) {
  const data = cleanNullArgs({ category, name, description });
  const token = getCookie('token');
  return axios.patch(
    `https://study-watson.lhy.kr/api/v1/study/${id}/`,
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

function* updateStudy(action) {
  try {
    const result = yield call(updateStudyAPI, action.data);
    const { data } = result;
    yield put({
      type: UPDATE_STUDY_SUCCESS,
      data,
    });
    Router.pushRoute(`/studyDetail/${data.pk}`);
  } catch (e) {
    console.log(JSON.stringify(e));
    console.error(e);
    alert('스터디 업데이트에 실패했습니다');
    yield put({
      type: UPDATE_STUDY_FAILURE,
    });
  }
}

function* watchUpdateStudy() {
  yield takeEvery(UPDATE_STUDY_REQUEST, updateStudy);
}

// LOAD_STUDIES
function loadStudiesAPI({ token, pk }) {
  return axios.get(
    `https://study-watson.lhy.kr/api/v1/study/memberships/?user=${pk}`,
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

// LOAD_STUDY
function loadStudyAPI({ token, studyId }) {
  return axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
}

function* loadStudy(action) {
  try {
    const result = yield call(loadStudyAPI, action.data);
    console.log(3333, result.data);
    // const { category, name, description } = result.data;
    yield put({
      type: LOAD_STUDY_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    yield put({
      type: LOAD_STUDY_FAILURE,
    });
  }
}

function* watchLoadStudy() {
  yield takeEvery(LOAD_STUDY_REQUEST, loadStudy);
}
// LOAD_STUDY_MEMBERSHIPS
function loadStudyMemvershipsAPI({ token, pk, studyId }) {
  return axios.get(
    `https://study-watson.lhy.kr/api/v1/study/memberships/?user=${pk}&study=${studyId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  );
}

function* loadStudyMemverships(action) {
  try {
    const result = yield call(loadStudyMemvershipsAPI, action.data);
    // const { category, name, description } = result.data;
    yield put({
      type: LOAD_STUDY_MEMBERSHIPS_SUCCESS,
      data: result.data[0],
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    yield put({
      type: LOAD_STUDY_MEMBERSHIPS_FAILURE,
    });
  }
}

function* watchLoadStudyMemberships() {
  yield takeEvery(LOAD_STUDY_MEMBERSHIPS_REQUEST, loadStudyMemverships);
}

// WITHDRAW_STUDY
function withdrawStudyAPI({ token, memberId }) {
  return axios.delete(
    `https://study-watson.lhy.kr/api/v1/study/memberships/${memberId}/`,
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
  yield all([
    fork(watchAdd),
    fork(watchUpdateStudy),
    fork(watchLoadStudies),
    fork(watchWithdrawStudy),
    fork(watchLoadStudy),
    fork(watchLoadStudyMemberships),
  ]);
}
