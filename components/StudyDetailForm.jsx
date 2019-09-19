import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AddFAB from '../components/AddFAB';
import CategoryDesign from '../components/CategoryDesign';
import CategoryDevelop from '../components/CategoryDevelop';
import BlankScheduleCard from '../components/BlankScheduleCard';
import { Link } from '../routes';
import ScheduleCard from '../components/ScheduleCard';
import StudySettingBtn from '../components/StudySettingBtn';


const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
`;

const StyledStudyInfo = styled.div`
  width: calc(100vw - 3rem);
  margin: auto;
  position: relative;
  margin-top: 1.5rem;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0 0.55rem 0rem;
  color: #4d5256;
  font-weight: 900;
  width: 80%;
  word-break: keep-all;
  line-height: 1.2;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  color: #4d5256;
  line-height: 1.4;
  word-break: keep-all;
`;

const StyledIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
`;

const StyledCardTitle = styled.h2`
  font-size: 1rem;
  color: #4d5256;
  font-weight: 900;
`;

const StyledSubTitle = styled.div`
  font-size: 0.9rem;
  color: #878d91;
  margin: 2rem 0 0.7rem 0.5rem;
`;

const StyledCardBtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const StyledCardBtn = styled.div`
  width: calc((100vw - 3rem) / 2);
  background-color: #fff;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const StyledCardBtnWrapper = styled.a`
  display: inline-block;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
`;

const StyledCardSubTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: bold;
  color: #878d91;
  margin-top: 0.4rem;
`;

const StudyDetailForm = ({ study, studyId, token, member, schedule, user }) => {

  return (
    <>
      <StudySettingBtn
        studyId={studyId}
        token={token}
        memberId={member.pk}
        role={member.role}
      />
      <StyledScreen>
        <StyledStudyInfo>
          {study &&
            study.category &&
            study.category.name.length > 0 &&
            study.category.name === 'Develop' ? (
              <CategoryDevelop />
            ) : (
              <CategoryDesign />
            )}

          <StyledTitle>{study && !!study.name && study.name}</StyledTitle>
          <StyledText>
            {study && !!study.description && study.description}
          </StyledText>
          {study && !!study.icon && !!study.icon.image && (
            <StyledIcon src={study.icon.image} alt="img" />
          )}
        </StyledStudyInfo>
        <StyledSubTitle>다음 스터디 일정</StyledSubTitle>

        {schedule && schedule.pk ? (
          <ScheduleCard
            key={schedule.pk}
            studyId={studyId}
            schedule={schedule}
            token={token}
            user={JSON.stringify(user.pk)}
            role={member.role}
          />
        ) : (
            <BlankScheduleCard studyId={studyId} role={member.role} />
          )}

        <StyledSubTitle>스터디 정보</StyledSubTitle>
        <StyledCardBtnContainer>
          <StyledCardBtn>
            <Link
              route={`/study/${studyId}/afterStudy`}
              href={`/study/${studyId}/afterStudy`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-nextstudy.svg"
                  alt="next study icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>다가올 스터디</StyledCardTitle>
                <StyledCardSubTitle>Next Studies</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
          <StyledCardBtn>
            <Link
              route={`/study/${studyId}/beforeStudy`}
              href={`/study/${studyId}/beforeStudy`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-paststudy.svg"
                  alt="past study icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>이전 스터디</StyledCardTitle>
                <StyledCardSubTitle>Past Studies</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
          <StyledCardBtn>
            <Link
              route={`/studyMembers/${studyId}`}
              href={`/studyMembers/${studyId}`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-attendance.svg"
                  alt="attendance icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>출석부</StyledCardTitle>
                <StyledCardSubTitle>Attendance</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
          <StyledCardBtn>
            <Link
              route={`/studyMembersInfo/${studyId}`}
              href={`/studyMembersInfo/${studyId}`}
            >
              <StyledCardBtnWrapper>
                <img
                  src="/static/icon-study-member.svg"
                  alt="member icon"
                  style={{ marginBottom: '0.5rem' }}
                />
                <StyledCardTitle>스터디 멤버</StyledCardTitle>
                <StyledCardSubTitle>Members</StyledCardSubTitle>
              </StyledCardBtnWrapper>
            </Link>
          </StyledCardBtn>
        </StyledCardBtnContainer>

        {(member.role === 'manager' || member.role === 'sub_manager') && (
          <Link
            route={`/study/${studyId}/addSchedule`}
            href={`/study/${studyId}/addSchedule`}
          >
            <a>
              <AddFAB />
            </a>
          </Link>
        )}
      </StyledScreen>
    </>
  );
};


StudyDetailForm.propTypes = {
  study: PropTypes.object.isRequired,
  studyId: PropTypes.string.isRequired,
  schedule: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default StudyDetailForm;
