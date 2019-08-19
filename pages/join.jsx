import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Router from 'next/router';

import Header from '../containers/Header';
import {
  StyledTitle,
  StyledText,
  StyledIcon,
  StyledProfileContainer,
  StyledProfileImage,
  StyledProfileCount,
  getNearestScheduleStartAt,
} from '../components/MainLogIn';
import CategoryDevelop from '../components/CategoryDevelop';
import CategoryDesign from '../components/CategoryDesign';

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
      <div
        onClick={() => {
          join();
        }}
      >
        참여하기
      </div>
      <StyledTitle>{study.name}</StyledTitle>
      <StyledText>{study.description}</StyledText>
      <div>
        {!!study.category && study.category.name === 'Develop' ? (
          <CategoryDevelop />
        ) : (
          <CategoryDesign />
        )}
      </div>
      <div>
        {!!study && !!study.icon && (
          <StyledIcon
            src={study.icon.image}
            alt="img"
            style={{ width: '40px' }}
          />
        )}
      </div>
      <div>
        {!!study.scheduleSet &&
          study.scheduleSet.length > 0 &&
          getNearestScheduleStartAt(study.scheduleSet)}
      </div>
      <div>
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
      </div>
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
