import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Axios from 'axios';
import Header from '../containers/Header';

const studyDetail = ({ studyId, memberId, token }) => {
  const onClick = async () => {
    console.log(token);
    try {
      const result = await Axios.delete(
        `https://study-watson.lhy.kr/api/v1/study/members/${memberId}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      console.log(result);
      if (result.status === 204) {
        alert('탈퇴에 성공하셨습니다.');
        Router.pushRoute('/');
      } else {
        alert('탈퇴에 실패하셨습니다.');
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.message));
      alert('탈퇴에 실패하셨습니다.');
    }
  };
  return (
    <div>
      <Header />
      <div
        onClick={() =>
          Router.pushRoute(`/addSchedule/${studyId}/member/${memberId}`)
        }
      >
        일정 생성
      </div>
      <div onClick={onClick}>스터디 나가기</div>
    </div>
  );
};

studyDetail.getInitialProps = ({ ctx, token }) => {
  return {
    studyId: ctx.query.studyId || '0',
    memberId: ctx.query.memberId || '0',
    token,
  };
};

studyDetail.propTypes = {
  studyId: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default studyDetail;
