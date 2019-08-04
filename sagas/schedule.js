import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router';

import { cleanNullArgs } from '../common/cleanNullArgs';
import { getCookie } from '../common/cookie';

import {
  ADD_SCHEDULE_REQUEST,
  ADD_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_FAILURE,
  LOAD_SCHEDULES_REQUEST,
  LOAD_SCHEDULES_SUCCESS,
  LOAD_SCHEDULES_FAILURE,
  LOAD_SCHEDULE_REQUEST,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_SCHEDULE_FAILURE,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILURE,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAILURE,
} from '../reducers/schedule';

// ADD SCHEDULE
function addScheduleAPI({
  // eslint-disable-next-line camelcase
  study,
  location,
  description,
  voteEndAt,
  startAt,
  studyingTime,
}) {
  const data = cleanNullArgs({
    study,
    location,
    description,
    voteEndAt,
    startAt,
    studyingTime,
  });
  const token = getCookie('token');
  return axios.post(
    `https://study-watson.lhy.kr/api/v1/study/schedules/`,
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

function* addSchedule(action) {
  try {
    yield call(addScheduleAPI, action.data);
    yield put({
      type: ADD_SCHEDULE_SUCCESS,
    });
    Router.pushRoute(`/studyDetail/${action.data.study}`);
  } catch (error) {
    console.log(error.response.data);
    alert('스케줄 추가에 실패했습니다');
    yield put({
      type: ADD_SCHEDULE_FAILURE,
    });
  }
}

function* watchAddSchedule() {
  yield takeEvery(ADD_SCHEDULE_REQUEST, addSchedule);
}

// LOAD_SCHEDULES
function loadSchedulesAPI({ token, studyId }) {
  return axios.get(
    `https://study-watson.lhy.kr/api/v1/study/schedules/?study=${studyId}`,
    { headers: { Authorization: `Token ${token}` } },
  );
}

function* loadSchedules(action) {
  try {
    const result = yield call(loadSchedulesAPI, action.data);
    yield put({
      type: LOAD_SCHEDULES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('스케쥴 로드 실패');
    console.log(error);
    yield put({
      type: LOAD_SCHEDULES_FAILURE,
    });
  }
}

function* watchLoadSchedules() {
  yield takeEvery(LOAD_SCHEDULES_REQUEST, loadSchedules);
}

// LOAD_SCHEDULE
function loadScheduleAPI({ token, scheduleId }) {
  return axios.get(
    `https://study-watson.lhy.kr/api/v1/study/schedules/${scheduleId}/`,
    { headers: { Authorization: `Token ${token}` } },
  );
}

function* loadSchedule(action) {
  try {
    const result = yield call(loadScheduleAPI, action.data);
    yield put({
      type: LOAD_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('스케쥴 로드 실패');
    console.log(error);
    yield put({
      type: LOAD_SCHEDULE_FAILURE,
    });
  }
}

function* watchLoadSchedule() {
  yield takeEvery(LOAD_SCHEDULE_REQUEST, loadSchedule);
}

// UPDATE_SCHEDULE
function updateScheduleAPI({
  id,
  study,
  location,
  description,
  voteEndAt,
  startAt,
  studyingTime,
}) {
  const data = cleanNullArgs({
    study,
    location,
    description,
    voteEndAt,
    startAt,
    studyingTime,
  });
  const token = getCookie('token');
  return axios.patch(
    `https://study-watson.lhy.kr/api/v1/study/schedules/${id}/`,
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

function* updateSchedule(action) {
  try {
    yield call(updateScheduleAPI, action.data);
    yield put({
      type: UPDATE_SCHEDULE_SUCCESS,
    });
    Router.pushRoute(`/studyDetail/${action.data.study}`);
  } catch (error) {
    console.log(error.response.data);
    alert('스케줄 업데이트에 실패했습니다');
    yield put({
      type: UPDATE_SCHEDULE_FAILURE,
    });
  }
}

function* watchUpdateSchedule() {
  yield takeEvery(UPDATE_SCHEDULE_REQUEST, updateSchedule);
}

// DELETE_SCHEDULE
function deleteScheduleAPI({ token, pk }) {
  return axios.delete(
    `https://study-watson.lhy.kr/api/v1/study/schedules/${pk}/`,
    { headers: { Authorization: `Token ${token}` } },
  );
}

function* deleteSchedule(action) {
  try {
    const result = yield call(deleteScheduleAPI, action.data);
    console.log('123', result);
    if (result.status === 204) {
      alert('스케쥴 삭제에 성공하셨습니다.');
    } else {
      alert('스케쥴 삭제에 실패하셨습니다.');
    }
    yield put({
      type: DELETE_SCHEDULE_SUCCESS,
      pk: action.data.pk,
    });
  } catch (error) {
    console.log(error);
    alert('스케쥴 삭제에 실패하셨습니다.');
    yield put({
      type: DELETE_SCHEDULE_FAILURE,
    });
  }
}

function* watchDeleteSchedule() {
  yield takeEvery(DELETE_SCHEDULE_REQUEST, deleteSchedule);
}

export default function* ScheduleSaga() {
  yield all([
    fork(watchAddSchedule),
    fork(watchLoadSchedules),
    fork(watchLoadSchedule),
    fork(watchUpdateSchedule),
    fork(watchDeleteSchedule),
  ]);
}
