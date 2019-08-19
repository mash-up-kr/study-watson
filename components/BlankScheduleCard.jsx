import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from '../routes';

const StyledCard = styled.div`
  width: 100%;
  height: 196px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  color: #878D91;
  line-height: 1.5;
  text-align: center;
`;

const StyledBtn = styled.button`
  font-size: 0.9rem;
  color: #ffffff;
  background-color: #4B2BFF;
  border-radius: 4px;
  padding: 1rem 2rem;
  border: none;
  margin-top: 1rem;
`;

const BlankScheduleCard = ({ studyId, role }) => {
  return (
    (role === 'manager' || role === 'sub_manager') ? (
      <StyledCard>
        <StyledText>
          다음 스터디 일정이 없습니다.
          <br />
          일정을 만들고 스터디 멤버들과 공유해보세요!
        </StyledText>
        <Link
          route={`/addSchedule/${studyId}`}
          href={`/addSchedule/${studyId}`}
        >
          <a>
            <StyledBtn>일정 만들기</StyledBtn>
          </a>
        </Link>
      </StyledCard>
    ) : (
      <StyledCard>
          <StyledText>
            다음 스터디 일정이 없습니다.
          </StyledText>
        </StyledCard>
      )

  );
};

BlankScheduleCard.propTypes = {
  studyId: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default BlankScheduleCard;