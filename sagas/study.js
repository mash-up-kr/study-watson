import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { cleanNullArgs } from '../common/cleanNullArgs';
import { getCookie } from '../common/cookie';

import {
  ADD_STUDY_REQUEST,
  ADD_STUDY_SUCCESS,
  ADD_STUDY_FAILURE,
  LOAD_STUDIES_REQUEST,
  LOAD_STUDIES_SUCCESS,
  LOAD_STUDIES_FAILURE,
} from '../reducers/study';

// ADD_STUDY
function addAPI({ category, name, description }) {
  console.log('category', category);
  const data = cleanNullArgs({ category, name, description });
  console.log('data', data);
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

function* add(action) {
  try {
    const result = yield call(addAPI, action.data);
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
  yield takeEvery(ADD_STUDY_REQUEST, add);
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

export default function* StudySaga() {
  yield all([fork(watchAdd), fork(watchLoadStudies)]);
}
