import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import checkMember from '../../common/checkMember';
import Header from '../../components/Header';
import EditStudyForm from './EditStudyForm';
import checkLogin from '../../common/checkLogin';
import redirect from '../../common/redirect'

const EditStudy = ({ study, user, icons }) => {
  return (
    <>
      <Header user={user} />
      <EditStudyForm study={study} icons={icons} />
    </>
  );
};
EditStudy.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { studyId } = ctx.query;
  if (!studyId) {
    redirect({ res });
  }
  const membership = await checkMember({ res, token, studyId, pk });
  if (membership.role !== 'manager' && membership.role !== 'sub_manager') {
    studyDetail({ res, studyId });
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
      studyId,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

EditStudy.propTypes = {
  user: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
  study: PropTypes.object.isRequired,
}


export default EditStudy;
