import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from '../routes';

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

const StyledItem2 = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #d8d8d8;
  &:first-child {
    margin-top: 2rem;
  }
`;

const StyledItem = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #d8d8d8;
`;

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

const LogoutMenu = ({ value }) => {
  return (
    <>
      <StyledMenu show={value}>
        <ul>
          <li>
            <Link route="/about" href="/about">
              <a>
                <StyledItem2>알아보기</StyledItem2>
              </a>
            </Link>
          </li>
          <li>
            <Link route="/signup" href="/signup">
              <a>
                <StyledItem>회원가입</StyledItem>
              </a>
            </Link>
          </li>
          <li>
            <Link route="/login" href="/login">
              <a>
                <StyledItem>로그인</StyledItem>
              </a>
            </Link>
          </li>
        </ul>
      </StyledMenu>
      <StyledBackground show={value} />
    </>
  );
};

LogoutMenu.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default LogoutMenu;
