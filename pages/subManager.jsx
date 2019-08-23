import React, { useEffect, useState } from 'react';
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

const subManager = ({ studyId, token }) => {
  const { membershipSet } = useSelector(state => state.study.study);
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    const filterMemberList =
      membershipSet &&
      membershipSet.length > 0 &&
      membershipSet.filter(membership => {
        return (
          membership.isWithdraw !== true &&
          membership.role !== 'manager' &&
          membership.role !== 'sub_manager'
        );
      });
    setMemberList(filterMemberList);
  }, membershipSet);
  const onClick = async event => {
    const { pk } = event.target.dataset;
    try {
      await Axios.patch(
        `https://study-watson.lhy.kr/api/v1/study/memberships/${pk}/`,
        {
          role: 'sub_manager',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      const filterMemberList = memberList.filter(membership => {
        return parseInt(membership.pk, 10) !== parseInt(pk, 10);
      });
      setMemberList([...filterMemberList]);
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
                <StyledMemberList key={membership.pk}>
                  <StyledPhoto src={membership.user.imgProfile} alt="img" />
                  <StyledName style={{ marginRight: '8px' }}>
                    {membership.user.nickname || membership.user.email}
                  </StyledName>
                  <StyledText>{membership.roleDisplay}</StyledText>
                  <StyledAttendBtnContainer>
                    <StyledAttendBtn data-pk={membership.pk} onClick={onClick}>
                      서브 리더 임명
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

subManager.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: LOAD_STUDY_REQUEST,
    data: { token, studyId },
  });
  return { studyId, token };
};

subManager.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default subManager;
