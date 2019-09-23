import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from '../../routes';
import { deleteCookie } from '../../common/cookie';

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
  & :last-child {
    border-top: 1px solid #EDEDED;
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

const StyledProfile = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledPhoto = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #595959;
`;

const StyledName = styled.div`
  overflow: scroll;
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const LoginMenu = ({ value, show, user }) => {
  const { nickname, imgProfile } = user;

  const onClickLogout = () => {
    show();
    deleteCookie('token');
    deleteCookie('pk');
    window.location.href = '/';
  };

  return (
    <>
      <StyledMenu show={value}>
        <StyledProfile>
          <StyledPhoto src={imgProfile} />
          <StyledName>{nickname}</StyledName>
        </StyledProfile>
        <ul>
          <StyledItem>
            <Link route="/" href="/">
              <a>
                <StyledLabel>
                  <StyledIcon
                    src="/static/icon-menu-study.svg"
                    alt="study icon"
                  />
                  내 스터디
                </StyledLabel>
              </a>
            </Link>
          </StyledItem>
          <StyledItem>
            <Link route="/addStudy" href="/addStudy">
              <a>
                <StyledLabel>
                  <StyledIcon
                    src="/static/icon-menu-add.svg"
                    alt="add icon"
                  />
                  스터디 만들기
                </StyledLabel>
              </a>
            </Link>
          </StyledItem>
          <StyledItem>
            <Link route="/profile" href="/profile">
              <a>
                <StyledLabel>
                  <StyledIcon
                    src="/static/icon-menu-profile.svg"
                    alt="profile icon"
                  />
                  프로필 관리
                </StyledLabel>
              </a>
            </Link>
          </StyledItem>
          <StyledItem>
            <div onClick={onClickLogout}>
              <StyledLabel>
                <StyledIcon
                  src="/static/icon-logout.svg"
                  alt="logout icon"
                />
                로그아웃
              </StyledLabel>
            </div>
          </StyledItem>
        </ul>
      </StyledMenu>
    </>
  );
};

LoginMenu.propTypes = {
  value: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginMenu;
