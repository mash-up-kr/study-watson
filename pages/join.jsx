import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Router from 'next/router';

import Header from '../containers/Header';

const Join = ({ id, token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector(state => state.user);

  const fetchData = async () => {
    if (!user.isLogin) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
    }
    try {
      const result = await Axios.get(
        `https://study-watson.lhy.kr/api/v1/study/members/?study=${id}&user=${
          user.pk
        }`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      if (result.data.length > 0) {
        alert('이미 참여한 스터디 입니다.');
        Router.pushRoute('/');
      } else {
        const info = await Axios.get(
          `https://study-watson.lhy.kr/api/v1/study/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
        setName(info.data.name);
        setDescription(info.data.description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const join = async () => {
    const result = await Axios.post(
      `https://study-watson.lhy.kr/api/v1/study/members/`,
      {
        user: user.pk,
        study: id,
        role: 'normal',
      },
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    if (result.data.user.pk === user.pk) {
      alert('참여에 성공했습니다.');
    } else {
      alert('참여에 실패 했습니다.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div style={{ fontSize: '24px' }}>name</div>
      <div style={{ color: 'red' }}>{name}</div>
      <div style={{ fontSize: '24px' }}>description</div>
      <div style={{ color: 'red' }}>{description}</div>
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
  return { id: ctx.query.id || '0', token };
};

Join.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Join;
