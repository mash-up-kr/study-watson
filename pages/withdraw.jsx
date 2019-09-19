import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import checkLogin from '../common/checkLogin';
import Header from '../containers/Header';
import { WITHDRAW_USER_REQUEST } from '../reducers/user';
import { StyledTitle } from '../common/StyledComponents';

const StyledWithdraw = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
`;

const StyledButton = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #4B2BFF;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
`;

const StyledList = styled.li`
  color: #4D5256;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const Withdraw = ({ user }) => {
  const { pk } = user;
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch({
      type: WITHDRAW_USER_REQUEST,
      data: {
        pk,
      },
    });
  }, []);
  return (
    <>
      <Header user={user} />
      <StyledWithdraw>
        <StyledTitle>탈퇴하기</StyledTitle>
        <ul>
          <StyledList>･ 참여 중인 스터디 정보가 모두 삭제됩니다.</StyledList>
          <StyledList>･ 만든 스터디가 있다면 스터디 장을 위임해주세요.</StyledList>
          <StyledList>
            ･ 회원 탈퇴 시 계정 정보가 모두 삭제되며 삭제된 계정은 복구되지
            않습니다.
          </StyledList>
        </ul>
        <StyledButton onClick={onClick}>회원탈퇴</StyledButton>
      </StyledWithdraw>
    </>
  );
};

Withdraw.getInitialProps = async ({ ctx, token, res, pk }) => {
  const user = await checkLogin({ res, token })
  return {
    user,
  };
};

Withdraw.propTypes = {
  user: PropTypes.object.isRequired,
}


export default Withdraw;
