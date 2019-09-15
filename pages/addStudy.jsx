import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types'

import CreateStudy from '../containers/CreateStudy';
import Header from '../containers/Header';
import checkLogin from '../common/checkLogin'

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
  const result = await axios.get(
    'https://study-watson.lhy.kr/api/v1/study/icons/',
  );
  console.log(result.data)
  return {
    user,
    icons: result.data,
  }
}

AddStudy.propTypes = {
  user: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
}

export default AddStudy;
