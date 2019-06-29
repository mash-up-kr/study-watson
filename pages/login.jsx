import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';

const Index = () => {
  // const [click, isClicked] = useState(false);
  const dispatch = useDispatch();
  const goLogin = async () => {
    try {
      const result = await axios.post(
        'https://study-watson.lhy.kr/api/v1/auth/token/',
        { username: 'bb@bb.com', email: 'bb@bb.com', password: '12341234' },
      );
      console.log(result);
      const json = {
        id: result.data.user.pk,
        name: result.data.user.username,
        email: result.data.user.email,
        phone: result.data.user.phoneNumber,
      };
      dispatch({
        type: 'LOG_IN',
        ...json,
      });
      localStorage.setItem('user', JSON.stringify({ ...json }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div>로그인</div>
      <Btn onClick={goLogin}>Google로 시작하기</Btn>
    </div>
  );
};

const Btn = styled.button`
  background-color: blue;
  color: white;
`;

export default Index;
