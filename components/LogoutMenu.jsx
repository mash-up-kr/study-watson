import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from '../routes';

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
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
  & :first-child {
    margin-top: 2rem;
    border-bottom: 1px solid #EDEDED;
  }
`;

const StyledLabel = styled.span`
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #4D5256;
`;

const StyledIcon = styled.img`
  margin-right: 1rem;
`;

const LogoutMenu = ({ value }) => {
  return (
    <>
      <StyledMenu show={value}>
        <ul>
          <StyledItem>
            <Link route="/about" href="/about">
              <a>
                <StyledLabel>
                  <StyledIcon
                    src="/static/icon-menu-info.svg"
                    alt="profile info"
                  />
                  알아보기
                </StyledLabel>
              </a>
            </Link>
          </StyledItem>
          <StyledItem>
            <Link route="/signup" href="/signup">
              <a>
                <StyledLabel>
                  <StyledIcon
                    src="/static/icon-invite.svg"
                    alt="signup icon"
                  />
                  회원가입
                </StyledLabel>
              </a>
            </Link>
          </StyledItem>
          <StyledItem>
            <Link route="/login" href="/login">
              <a>
                <StyledLabel>
                  <StyledIcon
                    src="/static/icon-menu-login.svg"
                    alt="login icon"
                  />
                  로그인
                </StyledLabel>
              </a>
            </Link>
          </StyledItem>
        </ul>
      </StyledMenu>
    </>
  );
};

LogoutMenu.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default LogoutMenu;
