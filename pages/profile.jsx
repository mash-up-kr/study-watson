import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Header from '../containers/Header';
import { Link } from '../routes';

const StyledPhoto = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #595959;
`;

const StyledName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledItem = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledProfile = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledContainer = styled.ul`
  width: 100%;
`;

const Profile = () => {
  const { name, email, phone } = useSelector(state => state.user);

  return (
    <StyledProfile>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <StyledPhoto />
        <StyledName>{name}</StyledName>
        <StyledContainer>
          <li>
            <StyledItem>
              <div>이메일</div>
              <div>{email}</div>
            </StyledItem>
          </li>
          <li>
            <StyledItem>
              <div>전화번호</div>
              <div>{phone}</div>
            </StyledItem>
          </li>
          <li>
            <StyledItem>
              <Link route="/withdraw" href="/withdraw">
                회원탈퇴
              </Link>
            </StyledItem>
          </li>
        </StyledContainer>
      </div>
    </StyledProfile>
  );
};

export default Profile;
