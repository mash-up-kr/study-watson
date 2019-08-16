import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../containers/Header';
import { Link } from '../routes';
import { LOG_OUT_REQUEST } from '../reducers/user';

const StyledPhoto = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #595959;
  margin: 1.5rem 0 1rem 0;
`;

const StyledName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4D5256;
`;

const StyledText = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: #878D91;
`;

const StyledItem = styled.li`
  width: 100%;
  padding: 0.8rem 0;
  border-bottom: 1px solid #d8d8d8;
`;

const StyledLabel = styled.span`
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #4D5256;
`;

const StyledProfile = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  height: calc(100vh - 56px);
`;

const StyledContainer = styled.ul`
  width: 100%;
  margin-top: 2rem;
`;

const Profile = () => {
  const { nickname, email, phoneNumber, imgProfile } = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  };

  return (
    <>
      <Header />
      <StyledProfile>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <StyledPhoto src={imgProfile} alt="" />
          <StyledName>{nickname}</StyledName>
          <StyledText>{email}</StyledText>
          <StyledText>{phoneNumber}</StyledText>
          <StyledContainer>
            <StyledItem>
              <Link route="/profile-edit" href="/profile-edit">
                <a>
                  <StyledLabel>
                    <img
                      src="/static/icon-edit.svg"
                      alt="edit icon"
                      style={{ marginRight: '0.5rem' }}
                    />
                    프로필 수정
                  </StyledLabel>
                </a>
              </Link>
            </StyledItem>
            <StyledItem>
              <div onClick={onClick}>
                <StyledLabel>
                  <img
                    src="/static/icon-logout.svg"
                    alt="logout icon"
                    style={{ marginRight: '0.5rem' }}
                  />
                  로그아웃
                </StyledLabel>
              </div>
            </StyledItem>
            <StyledItem>
              <Link route="/withdraw" href="/withdraw">
                <a>
                  <StyledLabel>
                    <img
                      src="/static/icon-withdraw.svg"
                      alt="withdraw icon"
                      style={{ marginRight: '0.5rem' }}
                    />
                    회원탈퇴
                  </StyledLabel>
                </a>
              </Link>
            </StyledItem>
          </StyledContainer>
        </div>
      </StyledProfile>
    </>
  );
};

export default Profile;
