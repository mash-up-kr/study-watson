import React from 'react';
import PropTypes from 'prop-types';

import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import StudyInviteForm from '../components/StudyInviteForm';
import redirect from '../common/redirect'

const StudyInvite = ({ studyId, token, user }) => {
  return (
    <>
      <Header user={user} />
      <StudyInviteForm studyId={studyId} token={token} />
    </>
  );
};
StudyInvite.getInitialProps = async ({ ctx, token, res }) => {
  const user = await checkLogin({ res, token });
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  return {
    user,
    studyId,
    token,
  };
};

StudyInvite.propTypes = {
  user: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default StudyInvite;
