import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import axios from 'axios';

import { Link } from '../routes';
import {
  StyledMemberList,
  StyledPhoto,
  StyledName,
  StyledAttendBtnContainer,
  StyledAttendBtn,
} from '../components/Attendance';
import { StyledText } from '../components/MemberListItem';

const ManagerForm = ({ studyId, token, manager, memberList }) => {

  const onClick = async event => {
    try {
      await Promise.all([
        axios.patch(
          `https://study-watson.lhy.kr/api/v1/study/memberships/${
          event.target.dataset.pk
          }/`,
          {
            role: 'manager',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          },
        ),
        axios.patch(
          `https://study-watson.lhy.kr/api/v1/study/memberships/${
          manager[0].pk
          }/`,
          {
            role: 'sub_manager',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          },
        ),
      ])
    } catch (error) {
      console.log(error.response.data);
    }
    Router.push(`/studyDetail/${studyId}`);
  };
  return (
    <>
      <div style={{ margin: '8px 8px 16px' }}>
        <Link
          route={`/studyDetail/${studyId}`}
          href={`/studyDetail/${studyId}`}
        >
          <a>스터디로 돌아가기</a>
        </Link>
      </div>
      <div style={{ margin: '8px' }}>
        {!!memberList &&
          memberList.map(membership => {
            return (
              <StyledMemberList key={membership.pk}>
                <StyledPhoto src={membership.user.imgProfile} alt="img" />
                <StyledName style={{ marginRight: '8px' }}>
                  {membership.user.nickname || membership.user.email}
                </StyledName>
                <StyledText>{membership.roleDisplay}</StyledText>
                <StyledAttendBtnContainer>
                  <StyledAttendBtn data-pk={membership.pk} onClick={onClick}>
                    리더 임명
                    </StyledAttendBtn>
                </StyledAttendBtnContainer>
              </StyledMemberList>
            );
          })}
      </div>
    </>
  );
};

ManagerForm.propTypes = {
  manager: PropTypes.array.isRequired,
  memberList: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  studyId: PropTypes.string.isRequired,
};

export default ManagerForm;
