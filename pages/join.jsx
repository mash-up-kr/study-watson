import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Router from 'next/router';

import Header from '../containers/Header';
import {
  StyledProfileImage,
  StyledProfileCount,
} from '../components/MainLogIn';
import { StyledActionButton } from '../common/StyledComponents';

const StyledContainer = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0 0.55rem 0;
  color: #4d5256;
  font-weight: 900;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
`;

const StyledIcon = styled.img`
  width: 40px;
`;

const StyledProfileContainer = styled.div`
  margin: 1rem 0 3rem 0;
`;

const Join = ({ id, token }) => {
  const user = useSelector(state => state.user);
  const [study, setStudy] = useState({});

  const join = async () => {
    console.log('id', id);
    try {
      const result = await Axios.post(
        'https://study-watson.lhy.kr/api/v1/study/memberships/token/',
        {
          key: id,
        },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      alert('성공적으로 가입되었습니다');

      Router.pushRoute(`/studyDetail/${result.data.study.pk}`);
    } catch (error) {
      if (error.response.data.detail) {
        alert(error.response.data.detail);
      }
    }
  };

  const fetchStudyData = async () => {
    console.log(id);
    try {
      const result = await Axios.get(
        `https://study-watson.lhy.kr/api/v1/study/token/${id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      console.log(result.data);
      setStudy(result.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (!id || id === '0') {
      alert('주소 확인이 필요합니다.');
      Router.pushRoute('/');
    }
    if (!user.isLogin) {
      alert('로그인이 필요합니다.');
      Router.pushRoute('/login');
    }
    fetchStudyData();
  }, []);
  const userProfileCount =
    !!study.studyMembers &&
    study.studyMembers.length > 3 &&
    `+${study.studyMembers.length - 3}`;
  return (
    <>
      <Header />
      <StyledContainer>
        <div>
          {!!study && !!study.icon && (
            <StyledIcon
              src={study.icon.image}
              alt="img"
            />
          )}
        </div>
        <StyledTitle>{study.name}</StyledTitle>
        <StyledText>{study.description}</StyledText>

        <StyledProfileContainer>
          {!!study.membershipSet &&
            study.membershipSet.length > 0 &&
            study.membershipSet
              .slice(0, Math.min(3, study.membershipSet.length))
              .map(item => {
                console.log(item);
                return (
                  <StyledProfileImage
                    key={item.user.pk}
                    src={item.user.imgProfile}
                    alt="profile"
                  />
                );
              })}
          {!!study.membershipSet &&
            study.membershipSet.length > 0 &&
            study.membershipSet.length > 3 && (
              <StyledProfileCount>{userProfileCount}</StyledProfileCount>
            )}
        </StyledProfileContainer>

        <StyledActionButton
          type="button"
          value="참여하기"
          onClick={() => {
            join();
          }}
        />
      </StyledContainer>
    </>
  );
};

Join.getInitialProps = ({ ctx, token }) => {
  return {
    id: ctx.query.id || '0',
    token,
  };
};

Join.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Join;
