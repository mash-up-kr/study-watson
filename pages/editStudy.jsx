import axios from 'axios';
import React from 'react';

import Header from '../containers/Header';
import EditStudy from '../components/EditStudy';
import checkLogin from '../common/checkLogin';
import redirect from '../common/redirect'

const editStudy = () => {
  return (
    <>
      <Header />
      <EditStudy />
    </>
  );
};
editStudy.getInitialProps = ({ ctx, token }) => {
  const studyId = ctx.query.studyId || '0';
  const result = await axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  return {
    studyId,
    token,
  };
};

export default editStudy;
