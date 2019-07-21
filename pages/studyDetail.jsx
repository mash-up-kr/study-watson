import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import { Link } from '../routes';
import Header from '../containers/Header';
import {
  LOAD_SCHEDULES_REQUEST,
  DELETE_SCHEDULE_REQUEST,
} from '../reducers/schedule';
import {
  WITHDRAW_STUDY_REQUEST,
  LOAD_STUDY_MEMBERSHIPS_REQUEST,
} from '../reducers/study';

const studyDetail = ({ studyId, token }) => {
  const { schedules } = useSelector(state => state.schedule);
  const { pk: memberId, role } = useSelector(state => state.study.memberships);
  const study = useSelector(state => state.study);
  console.log(111, study);

  const dispatch = useDispatch();

  const deleteSchedule = event => {
    if (window.confirm('스케쥴을 삭제 하시겠습니까?')) {
      const { pk } = event.currentTarget.dataset;
      dispatch({
        type: DELETE_SCHEDULE_REQUEST,
        data: {
          pk,
          token,
        },
      });
    }
  };

  const modifySchedule = pk => async () => {
    console.log('temp:', pk);
  };

  const onClickWithdrawStudy = () => {
    if (window.confirm('스터디를 탈퇴 하시겠습니까?')) {
      dispatch({
        type: WITHDRAW_STUDY_REQUEST,
        data: {
          token,
          memberId,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <Link route={`/addSchedule/${studyId}`} href={`/addSchedule/${studyId}`}>
        <a>일정 생성</a>
      </Link>
      <div>
        {schedules &&
          schedules.length > 0 &&
          schedules.map(schedule => {
            return (
              <div
                key={schedule.pk}
                style={{ border: '1px solid', margin: '30px 0' }}
              >
                <div>location</div>
                <div>{schedule.location}</div>
                <div>description</div>
                <div>{schedule.description}</div>
                <div>투표 만료 시간</div>
                <div>{schedule.voteEndAt}</div>
                <div>스터디 시작 시간</div>
                <div>{schedule.startAt}</div>
                <div>스터디 시간</div>
                <div>{schedule.studyingTime}</div>
                <div data-pk={schedule.pk} onClick={modifySchedule}>
                  [수정]
                </div>
                <div data-pk={schedule.pk} onClick={deleteSchedule}>
                  [삭제]
                </div>
                {(role === 'manager' || role === 'sub_manager') && (
                  <Link
                    route={`/schedule/${schedule.pk}`}
                    href={`/schedule/${schedule.pk}`}
                  >
                    <a>
                      <div>[출결 관리]</div>
                    </a>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
      <div onClick={() => Router.push(`/studyMembers/${studyId}`)}>
        멤버 관리
      </div>
      <div onClick={onClickWithdrawStudy}>스터디 나가기</div>
    </div>
  );
};

studyDetail.getInitialProps = ({ ctx, token, pk }) => {
  const { studyId = 0 } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_SCHEDULES_REQUEST,
    data: {
      studyId,
      token,
    },
  });
  ctx.store.dispatch({
    type: LOAD_STUDY_MEMBERSHIPS_REQUEST,
    data: {
      studyId,
      pk,
      token,
    },
  });
  return {
    studyId,
    token,
  };
};

studyDetail.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default studyDetail;
