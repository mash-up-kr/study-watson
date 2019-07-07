import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #ededed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const StyledFeature = styled.div``;
const StyledFeatureLi = styled.li`
  font-size: 18px;
  color: blue;
`;

const StyledDesc = styled.div``;
const StyledDescTitleLi = styled.li`
  font-size: 15px;
  color: gray;
  font-weight: bold;
`;
const StyledDescContextLi = styled.li``;
// StyledDescTitleLi : 스터디 관리, 포스팅, 일정 관리 및 출결 관리 등 설명(desc) 부분에서 타이틀을 말합니다
// StyledDescContextLi : 각각의 StyledDescTitleLi 의 타이틀에 대한 설명을 말합니다

const Information = () => {
  return (
    <div>
      <StyledLogo>
        <img src="/static/big-logo-sample.png" alt="logo" />
      </StyledLogo>

      <StyledTitle>
        {/* 인삿말 입니다 */}
        안녕하세요. 모든 스터디 관리를 한 곳에서 도와주는 Study Watson 입니다.
      </StyledTitle>

      <StyledFeature>
        {/* 할 수 있는 기능에 대해 간략하게 설명 */}
        <ul>
          <StyledFeatureLi>스터디 관리</StyledFeatureLi>
          <StyledFeatureLi>포스팅</StyledFeatureLi>
          <StyledFeatureLi>일정 관리 및 출결 관리</StyledFeatureLi>
          <StyledFeatureLi>멤버 관리</StyledFeatureLi>
          <StyledFeatureLi>과제물 관리</StyledFeatureLi>
        </ul>
      </StyledFeature>

      <StyledDesc>
        {/* StudyFeature 에서 말한 것을 상세하게 설명 */}
        <ol>
          <StyledDescTitleLi>스터디 관리</StyledDescTitleLi>
          <ul>
            <StyledDescContextLi>
              참여한 모든 스터디를 한 화면에서 손쉽게 볼 수 있습니다
            </StyledDescContextLi>
          </ul>

          <StyledDescTitleLi>포스팅</StyledDescTitleLi>
          <ul>
            <StyledDescContextLi>
              스터디원들에게 알릴 게시물을 작성할 수 있습니다
            </StyledDescContextLi>
          </ul>

          <StyledDescTitleLi>일정 관리 및 출결 관리</StyledDescTitleLi>
          <ul>
            <StyledDescContextLi>
              스터디의 일정을 만들 수 있습니다
            </StyledDescContextLi>
            <StyledDescContextLi>
              매 일정에 대하여 사전 참여 투표를 할 수 있습니다
            </StyledDescContextLi>
            <StyledDescContextLi>
              매 일정에 대하여 실제 출결 여부를 관리할 수 있습니다
            </StyledDescContextLi>
          </ul>

          <StyledDescTitleLi>멤버 관리</StyledDescTitleLi>
          <ul>
            <StyledDescContextLi>
              스터디에 참여하는 멤버를 관리할 수 있습니다
            </StyledDescContextLi>
          </ul>

          <StyledDescTitleLi>과제물 관리</StyledDescTitleLi>
          <ul>
            <StyledDescContextLi>
              스터디의 과제물 공지 및 제출 여부를 손쉽게 관리할 수 있습니다
            </StyledDescContextLi>
          </ul>
        </ol>
      </StyledDesc>
    </div>
  );
};

export default Information;
