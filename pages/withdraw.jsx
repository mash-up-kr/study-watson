import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import Header from '../components/Header';
import { WITHDRAW } from '../reducers/user';

const StyledWithdraw = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledButton = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #0077ff;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  position: fixed;
  bottom: 0;
`;

const Withdraw = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({
      type: WITHDRAW,
      isLogin: false,
    });
    Router.pushRoute('/');
  };

  return (
    <StyledWithdraw>
      <Header />
      <h2>탈퇴하기</h2>
      <ul>
        <li>･ 참여 중인 스터디 정보가 모두 삭제됩니다.</li>
        <li>･ 만든 스터디가 있다면 스터디 장을 위임해주세요.</li>
        <li>
          ･ 회원 탈퇴 시 계정 정보가 모두 삭제되며 삭제된 계정은 복구되지
          않습니다.
        </li>
      </ul>
      <StyledButton onClick={onClick}>회원탈퇴</StyledButton>
    </StyledWithdraw>
  );
};

export default Withdraw;
