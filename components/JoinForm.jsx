import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router';

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

const JoinForm = ({ study, token, id, userProfileCount }) => {

  const join = async () => {
    try {
      const result = await axios.post(
        'https://study-watson.lhy.kr/api/v1/study/memberships/token/',
        {
          key: id,
        },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      alert('성공적으로 가입되었습니다');
      console.log(result)

      Router.pushRoute(`/study/${result.data.study.pk}`);
    } catch (error) {
      console.log(error)
      if (!!error.response && !!error.response.data && error.response.data.detail) {
        alert(error.response.data.detail);
      }
    }
  };

  return (
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
          onClick={join}
        />
      </StyledContainer>
  );
};

JoinForm.propTypes = {
  userProfileCount: PropTypes.string.isRequired,
  study: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}


export default JoinForm;
