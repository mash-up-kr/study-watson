import PropTypes from 'prop-types';
import React from 'react';

import checkLogin from '../../common/checkLogin'
import CreateSchedule from './CreateSchedule'
import Header from '../../components/Header';
import redirect from '../../common/redirect';


const AddSchedule = ({ studyId, user }) => {
  return (
    <>
      <Header user={user} />
      <CreateSchedule studyId={studyId} />
    </>
  );
};

AddSchedule.getInitialProps = async ({ ctx, res, token }) => {
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

AddSchedule.propTypes = {
  user: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default AddSchedule;
