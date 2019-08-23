import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Axios from 'axios';
import { StyledImageText } from '../common/StyledComponents';
import { StyledPhoto, StyledName } from '../components/Attendance';

const StyledTitle = styled.div`
  color: black;
  line-height: 1.5;
  text-align: center;
  font-weight: bold;
`;

const StyledText = styled.div`
  color: #4d5256;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
  font-weight: lighter;
  margin-bottom: 1rem;
`;

const StyledLogo = styled.img`
  width: 100px;
  display: block;
  margin: 0 auto;
  padding: 1rem;
`;

const Information = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const name = ['jus0k', 'snaag', 'Yuni-Q', 'LeeHanYeong'];
    const one = await Axios.get(`https://api.github.com/users/${name[0]}`);
    const two = await Axios.get(`https://api.github.com/users/${name[1]}`);
    const three = await Axios.get(`https://api.github.com/users/${name[2]}`);
    const four = await Axios.get(`https://api.github.com/users/${name[3]}`);
    setUsers([one.data, two.data, three.data, four.data]);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <StyledLogo src="/static/logo-192.png" alt="logo" />
      <StyledImageText>
        효율적으로 스터디를
        <br />
        관리하는 가장 쉬운 방법
      </StyledImageText>
      <ul>
        <StyledTitle>스터디 관리</StyledTitle>
        <StyledText>
          스터디를 생성하고 초대를 통해 스터디에 참여 할 수 있습니다
        </StyledText>
        <StyledTitle>스터디 일정 관리</StyledTitle>
        <StyledText>스터디의 일정을 공유 할 수 있습니다</StyledText>
        <StyledTitle>참석 여부 투표</StyledTitle>
        <StyledText>
          스터디의 참석 여부를 투표하고 투표 결과를 확인 할 수 있습니다
        </StyledText>
        <StyledTitle>출석 관리</StyledTitle>
        <StyledText>
          스터디 매니저와 서브 매니저는 스터디 출석 여부를 수정 할 수 있습니다
        </StyledText>
        <StyledTitle>출석 확인</StyledTitle>
        <StyledText>출석 현황을 확인을 확인 할 수 있습니다</StyledText>
        <StyledTitle>멤버 관리</StyledTitle>
        <StyledText>스터디원의 권한을 변경 할 수 있습니다</StyledText>
      </ul>
      <StyledTitle>Contributor</StyledTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
        }}
      >
        {users.length > 0 &&
          users.map(user => {
            return (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  margin: '0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <StyledPhoto
                  src={user.avatar_url}
                  alt="img"
                  style={{ margin: '0 0 8px 0' }}
                />
                <StyledName>{user.name || user.login}</StyledName>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Information;
