import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { changeFormat } from '../common/changeFormat';

const StyledMemberList = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #595959;
  margin-right: 1rem;
`;

const StyledName = styled.div`
  font-weight: bold;
  color: #4d5256;
`;

const StyledText = styled.div`
  font-size: 0.8rem;
  color: #878d91;
  margin-top: 0.5rem;
`;

const StyledMoreButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  margin-left: auto;
`;

const StyledMoreIcon = styled.img`
  transform: ${props => (props.show ? 'rotate( 180deg )' : 'rotate(0)')};
  transition: all 0.3s cubic-bezier(1, -0.2, 0, 1.2);
`;

const StyledMoreList = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  padding-bottom: 1rem;
`;

const StyeldDate = styled.div`
  font-size: 0.9rem;
  color: #878d91;
`;

const StyleddAttendance = styled.div`
  font-size: 0.9rem;
  color: #878d91;
`;

const StyeldattendanceItem = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MemberAttendanceItem = ({ membership, attendCount }) => {
  const [click, setClick] = useState(false);

  const onClickMoreBtn = useCallback(() => {
    setClick(!click);
  }, [click]);
  return (
    <>
      <StyledMemberList>
        <StyledPhoto src={membership.user.imgProfile} alt="" />
        <StyledContainer>
          <StyledName>
            {membership.user.nickname || membership.user.email}
          </StyledName>
          <StyledText>{attendCount}</StyledText>
        </StyledContainer>
        <StyledMoreButton onClick={onClickMoreBtn}>
          <StyledMoreIcon
            show={click}
            src="/static/icon-arrowdown.svg"
            alt="more icon"
          />
        </StyledMoreButton>
      </StyledMemberList>
      <StyledMoreList show={click}>
        {membership.attendanceSet &&
          membership.attendanceSet.length > 0 &&
          membership.attendanceSet.map(attendance => {
            const date = changeFormat(
              attendance.schedule.startAt,
              attendance.schedule.studyingTime,
            );
            const dateText = `• ${date}`;
            return (
              <StyeldattendanceItem key={attendance.pk}>
                <StyeldDate>{dateText}</StyeldDate>
                <StyleddAttendance>
                  {attendance.attDisplay || '미정'}
                </StyleddAttendance>
              </StyeldattendanceItem>
            );
          })}
      </StyledMoreList>
    </>
  );
};

MemberAttendanceItem.propTypes = {
  membership: PropTypes.object.isRequired,
  attendCount: PropTypes.string.isRequired,
};

export default MemberAttendanceItem;
