import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

export const StyledPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #595959;
  margin-right: 0.8rem;
`;

export const StyledMemberList = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledName = styled.div`
  font-weight: bold;
  color: #4d5256;
  font-size: 0.9rem;
`;

export const StyledAttendBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

export const StyledAttendBtn = styled.button`
  font-size: 0.8rem;
  color: #878d91;
  background-color: #ededed;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  border: none;
  margin-left: 0.5rem;
`;

const Attendance = ({ attendance, onClickAttendance }) => {
  return (
    <StyledMemberList>
      <StyledPhoto src={attendance.user.imgProfile} alt="" />
      <StyledName>{attendance.user.nickname}</StyledName>
      {!!onClickAttendance && (
        <StyledAttendBtnContainer>
          <StyledAttendBtn
            data-pk={attendance.pk}
            data-user={attendance.user.pk}
            data-attendance="attend"
            onClick={onClickAttendance}
          >
            출석
          </StyledAttendBtn>
          <StyledAttendBtn
            data-pk={attendance.pk}
            data-user={attendance.user.pk}
            data-attendance="late"
            onClick={onClickAttendance}
          >
            지각
          </StyledAttendBtn>
          <StyledAttendBtn
            data-pk={attendance.pk}
            data-user={attendance.user.pk}
            data-attendance="absent"
            onClick={onClickAttendance}
          >
            결석
          </StyledAttendBtn>
        </StyledAttendBtnContainer>
      )}
    </StyledMemberList>
  );
};

Attendance.propTypes = {
  attendance: PropTypes.object.isRequired,
  onClickAttendance: PropTypes.any,
};

Attendance.defaultProps = {
  onClickAttendance: null,
};

export default Attendance;
