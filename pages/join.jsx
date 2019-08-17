import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Router from 'next/router';

import Header from '../containers/Header';

const Join = ({ id, token }) => {
  const user = useSelector(state => state.user);

  const join = async () => {
    console.log('id', id);
    try {
      const result = await Axios.post(
        'https://study-watson.lhy.kr/api/v1/study/memberships/token/',
        {
          key: id,
        },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      // alert('성공적으로 가입되었습니다');

      Router.pushRoute(`/studyDetail/${result.data.study.pk}`);
    } catch (error) {
      if (error.response.data.detail) {
        alert(error.response.data.detail);
      }
    }
  };

  useEffect(() => {
    if (!id || id === '0') {
      alert('주소 확인이 필요합니다.');
      Router.pushRoute('/');
    }
    if (!user.isLogin) {
      alert('로그인이 필요합니다.');
      Router.pushRoute('/login');
    }
    // join();
  }, []);

  return (
    <>
      <Header />
      <div
        onClick={() => {
          join();
        }}
      >
        참여하기
      </div>
    </>
  );
};

Join.getInitialProps = ({ ctx, token }) => {
  return {
    id: ctx.query.id || '0',
    token,
  };
};

Join.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Join;
