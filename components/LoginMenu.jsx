import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Link } from '../routes';
import { LOG_OUT } from '../reducers/user';

const StyledBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 60vw;
  height: 100vh;
  padding: 2rem;
  transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};
  background-color: #f7f7f7;
  transition: all 0.3s ease-in-out;
`;

const StyledItem = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #d8d8d8;
`;

const StyledProfile = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledPhoto = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #595959;
`;

const StyledName = styled.div`
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const LoginMenu = ({ name, value }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({
      type: LOG_OUT,
      isLogin: false,
    });
    Router.pushRoute('/');
  };

  return (
    <>
      <StyledMenu show={value}>
        <StyledProfile>
          <StyledPhoto />
          <StyledName>{name}</StyledName>
        </StyledProfile>
        <ul>
          <li>
            <Link route="/profile" href="/profile">
              <StyledItem>프로필 관리</StyledItem>
            </Link>
          </li>
          <li>
            <Link route="/create" href="/create">
              <StyledItem>스터디 만들기</StyledItem>
            </Link>
          </li>
          <li>
            <Link route="/" href="/">
              <StyledItem>내 스터디</StyledItem>
            </Link>
          </li>
          <li>
            <StyledItem>
              <div onClick={onClick}>로그아웃</div>
            </StyledItem>
          </li>
        </ul>
      </StyledMenu>
      <StyledBackground show={value} />
    </>
  );
};

LoginMenu.propTypes = {
  name: PropTypes.any.isRequired,
  value: PropTypes.bool.isRequired,
};

export default LoginMenu;