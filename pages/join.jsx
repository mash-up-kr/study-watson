import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import checkLogin from '../common/checkLogin';
import redirect from '../common/redirect'
import Header from '../containers/Header';
import JoinForm from '../components/JoinForm';

const Join = ({ study, token, id, user }) => {
  return (
    <>
      <Header user={user} />
      <JoinForm study={study} token={token} id={id} />
    </>
  );
};

Join.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  const { id } = ctx.query;
  if (!id) {
    redirect({ res });
  }
  try {
    const result = await axios.get(
      `https://study-watson.lhy.kr/api/v1/study/token/${id}/`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );

    // 이미 참여한 스터디 인지 확인 여부를 위한 코드이지만 alert를 띄우지 않고 리다이렉트 시키는 것이 맞는지 의문 ...
    // const isJoin = result.data.membershipSet.filter(object => {
    //   return object.user.pk === parseInt(pk, 10);
    // })

    // if (isJoin.length > 0) {
    //   redirect({ res });
    // }

    return {
      user,
      study: result.data,
      token,
      id,
    };
  } catch (error) {
    console.log(error);
    redirect({ res });
  }
};

Join.propTypes = {
  user: PropTypes.object.isRequired,
  study: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Join;
