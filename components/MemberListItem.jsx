import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

  &:last-child {
    text-align: right;
    margin-left: auto;
  }
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

export const StyledText = styled.div`
  font-size: 0.8rem;
  color: #878d91;
  &:last-child {
    margin-top: 0.5rem;
  }
`;

const MemberListItem = ({ membership }) => {
  return (
    <StyledMemberList>
      <StyledPhoto src={membership.user.imgProfile} alt="" />
      <StyledContainer>
        <StyledName>
          {membership.user.nickname || membership.user.email}
        </StyledName>
        <StyledText>{membership.roleDisplay}</StyledText>
      </StyledContainer>
      <StyledContainer>
        {membership.user.email && (
          <StyledText>{membership.user.email}</StyledText>
        )}
        {membership.user.phoneNumber && (
          <StyledText>{membership.user.phoneNumber}</StyledText>
        )}
      </StyledContainer>
    </StyledMemberList>
  );
};

MemberListItem.propTypes = {
  membership: PropTypes.object.isRequired,
};

export default MemberListItem;
