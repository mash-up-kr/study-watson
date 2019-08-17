import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { changeFormat } from '../common/changeFormat'

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
  color: #4D5256;
`;

const StyledText = styled.div`
  font-size: 0.8rem;
  color: #878D91;
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
  color: #878D91;
`;

const StyleddAttendance = styled.div`
  font-size: 0.9rem;
  color: #878D91;
  
`;

const StyeldattendanceItem = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MemberAttendanceItem = ({ membership }) => {
  const [click, setClick] = useState(false);

  const onClickMoreBtn = () => {
    setClick(!click);
  }

  let attend = 0;
  let late = 0;
  let absent = 0;
  membership.attendanceSet.forEach(attendance => {
    if (attendance.att === 'attend') {
      attend += 1;
    } else if (attendance.att === 'late') {
      late += 1;
    } else if (attendance.att === 'absent') {
      absent += 1;
    }
  });

  return (
    <>
      <StyledMemberList>
        <StyledPhoto
          src={membership.user.imgProfile}
          alt=""
        />
        <StyledContainer>
          <StyledName>
            {membership.user.nickname || membership.user.email}
          </StyledName>
          <StyledText>
            참석
            {' '}
            {attend}
            {' '}
            &middot; 지각
            {' '}
            {late}
            {' '}
            &middot; 결석
            {' '}
            {absent}
          </StyledText>
        </StyledContainer>
        <StyledMoreButton onClick={onClickMoreBtn}>
          <StyledMoreIcon show={click} src="/static/icon-arrowdown.svg" alt="more icon" />
        </StyledMoreButton>
      </StyledMemberList>
      <StyledMoreList show={click}>
        {membership.attendanceSet &&
          membership.attendanceSet.length > 0 &&
          membership.attendanceSet.map(attendance => {
            return (
              <StyeldattendanceItem key={attendance.pk}>
                <StyeldDate>
                  &bull;
                  {' '}
                  {changeFormat(attendance.schedule.startAt)}
                </StyeldDate>
                <StyleddAttendance>{attendance.attDisplay || '미정'}</StyleddAttendance>
              </StyeldattendanceItem>
            );
          })}
      </StyledMoreList>
    </>
  );
};

MemberAttendanceItem.propTypes = {
  membership: PropTypes.object.isRequired,
};

export default MemberAttendanceItem;