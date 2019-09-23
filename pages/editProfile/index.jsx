import PropTypes from 'prop-types';
import React from 'react';

import checkLogin from '../../common/checkLogin';
import EditProfileForm from './EditProfileForm';
import Header from '../../components/Header';

const EditProfile = ({ user }) => {

  return (
    <>
      <Header user={user} />
      <EditProfileForm user={user} />
    </>
  );
};

EditProfile.getInitialProps = async ({ token, res }) => {
  const user = await checkLogin({ res, token });
  return {
    user,
  };
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
};


export default EditProfile;
