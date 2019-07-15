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
} from '../reducers/schedule';

// ADD SCHEDULE
function addScheduleAPI({ study, location, description, date, dueDate }) {
  const data = cleanNullArgs({ study, location, description, date, dueDate });
  console.log('data', data);
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
    Router.pushRoute(
      `/studyDetail/${action.studyId}/member/${action.memberId}`,
    );
  } catch (e) {
    console.log(JSON.stringify(e));
    console.error(e);
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
function loadSchedulesAPI({ token, pk }) {
  return axios.get(
    `https://study-watson.lhy.kr/api/v1/study/schedules/${pk}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  );
}

function* loadSchedules(action) {
  try {
    const result = yield call(loadSchedulesAPI, action);
    yield put({
      type: LOAD_SCHEDULES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    yield put({
      type: LOAD_SCHEDULES_FAILURE,
    });
  }
}

function* watchLoadSchedules() {
  yield takeEvery(LOAD_SCHEDULES_REQUEST, loadSchedules);
}

export default function* ScheduleSaga() {
  yield all([fork(watchAddSchedule), fork(watchLoadSchedules)]);
}
