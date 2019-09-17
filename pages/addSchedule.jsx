import React from 'react';
import PropTypes from 'prop-types';

import CreateSchedule from '../components/CreateSchedule'
import Header from '../containers/Header';
import checkLogin from '../common/checkLogin'
import redirect from '../common/redirect';


const addSchedule = ({ studyId, user }) => {
  return (
    <>
      <Header user={user} />
      <CreateSchedule studyId={studyId} />
    </>
  );
};

addSchedule.getInitialProps = async ({ ctx, res, token }) => {
  const user = await checkLogin({ res, token });
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  return {
    user,
    studyId,
  };
};

addSchedule.propTypes = {
  user: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default addSchedule;
