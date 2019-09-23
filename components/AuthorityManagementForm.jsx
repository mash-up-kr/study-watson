import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '../routes';
import {
  StyledMemberList,
  StyledPhoto,
  StyledName,
  StyledAttendBtnContainer,
  StyledAttendBtn,
} from './Attendance';
import { StyledText } from '../pages/studyMembersInfo/MemberListItem';

const AuthorityManagementForm = ({ studyId, onClick, memberList, text }) => {

  return (
    <>
      <div style={{ margin: '8px 8px 16px' }}>
        <Link
          route={`/study/${studyId}`}
          href={`/study/${studyId}`}
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
                    {text}
                  </StyledAttendBtn>
                </StyledAttendBtnContainer>
              </StyledMemberList>
            );
          })}
      </div>
    </>
  );
};

AuthorityManagementForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  memberList: PropTypes.array.isRequired,
  studyId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AuthorityManagementForm;
