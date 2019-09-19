import axios from 'axios';
import PropTypes from 'prop-types'
import React from 'react';

import checkLogin from '../common/checkLogin'
import CreateStudy from '../components/CreateStudy';
import Header from '../components/Header';

const AddStudy = ({ user, icons }) => {
  return (
    <div>
      <Header user={user} />
      <CreateStudy icons={icons} />
    </div>
  );
};

AddStudy.getInitialProps = async ({ res, token }) => {
  const user = await checkLogin({ res, token });
  try {
    const result = await axios.get(
      'https://study-watson.lhy.kr/api/v1/study/icons/',
    );
    return {
      user,
      icons: result.data,
    }
  } catch (error) {
    console.log(error);
  }
}

AddStudy.propTypes = {
  user: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
}

export default AddStudy;
