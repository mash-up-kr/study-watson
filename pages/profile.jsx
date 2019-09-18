import PropTypes from 'prop-types';
import React from 'react';

import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import ProfileForm from '../components/ProfileForm';

const Profile = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <ProfileForm user={user} />
    </>
  );
};

Profile.getInitialProps = async ({ token, res }) => {
  const user = await checkLogin({ res, token });
  return {
    user,
  };
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
