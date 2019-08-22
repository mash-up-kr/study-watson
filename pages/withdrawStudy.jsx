import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Axios from 'axios';
import { LOAD_STUDY_REQUEST } from '../reducers/study';
import Header from '../containers/Header';
import { Link } from '../routes';
import {
  StyledMemberList,
  StyledPhoto,
  StyledName,
  StyledAttendBtnContainer,
  StyledAttendBtn,
} from '../components/Attendance';
import { StyledText } from '../components/MemberListItem';

const WithdrawStudy = ({ studyId, token }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const [memberList, setMemberList] = useState([]);
  const mount = useRef(null);
  if (!mount.current) {
    mount.current = true;
    const filterMemberList =
      membershipSet &&
      membershipSet.length > 0 &&
      membershipSet.filter(membership => {
        return membership.isWithdraw !== true && membership.role !== 'manager';
      });
    setMemberList(filterMemberList);
  }
  const onClick = async event => {
    const { pk } = event.target.dataset;
    try {
      await Axios.delete(
        `https://study-watson.lhy.kr/api/v1/study/memberships/${pk}/`,
        {
          role: 'normal',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      const filterMemberList = membershipSet.filter(membership => {
        return JSON.stringify(membership.pk) === JSON.stringify(pk);
      });
      setMemberList(filterMemberList);
    } catch (error) {
      console.log(error);
      if (error) {
        console.log(error.response);
      }
    }
  };
  return (
    <div style={{ margin: '8px' }}>
      <Header />
      <div>
        <div style={{ margin: '8px 8px 16px' }}>
          <Link
            route={`/studyDetail/${studyId}`}
            href={`/studyDetail/${studyId}`}
          >
            <a>스터디로 돌아가기</a>
          </Link>
        </div>
        <div style={{ margin: '8px' }}>
          {memberList &&
            memberList.map(membership => {
              return (
                <StyledMemberList key={`${membership.id}`}>
                  <StyledPhoto src={membership.user.imgProfile} alt="img" />
                  <StyledName style={{ marginRight: '8px' }}>
                    {membership.user.nickname || membership.user.email}
                  </StyledName>
                  <StyledText>{membership.roleDisplay}</StyledText>
                  <StyledAttendBtnContainer>
                    <StyledAttendBtn data-pk={membership.pk} onClick={onClick}>
                      제명
                    </StyledAttendBtn>
                  </StyledAttendBtnContainer>
                </StyledMemberList>
              );
            })}
        </div>
      </div>
    </div>
  );
};

WithdrawStudy.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  return { studyId, token };
};

WithdrawStudy.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default WithdrawStudy;
