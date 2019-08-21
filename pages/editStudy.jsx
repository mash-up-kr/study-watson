import React from 'react';

import Header from '../containers/Header';
import EditStudy from '../components/EditStudy';
import { LOAD_STUDY_REQUEST } from '../reducers/study';

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
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  return {
    studyId,
    token,
  };
};

export default editStudy;
