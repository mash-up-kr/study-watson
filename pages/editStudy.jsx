import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import Header from '../containers/Header';
import EditStudy from '../components/EditStudy';
import checkLogin from '../common/checkLogin';
import redirect from '../common/redirect'

const editStudy = ({ study, user, icons }) => {
  return (
    <>
      <Header user={user} />
      <EditStudy study={study} icons={icons} />
    </>
  );
};
editStudy.getInitialProps = async ({ ctx, token, res }) => {
  const user = await checkLogin({ res, token })
  const studyId = ctx.query.studyId || '0';
  if (!studyId) {
    redirect({ res });
  }
  try {
    const result = await Promise.all([
      axios.get(`https://study-watson.lhy.kr/api/v1/study/${studyId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }),
      axios.get(
        'https://study-watson.lhy.kr/api/v1/study/icons/',
      ),
    ])
    return {
      study: result[0].data,
      icons: result[1].data,
      user,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

editStudy.propTypes = {
  user: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
  study: PropTypes.object.isRequired,
}


export default editStudy;
