import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from '../routes';

import {
  WITHDRAW_STUDY_REQUEST,
} from '../reducers/study';

const StyledSettingBtn = styled.button`
  position: fixed;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
`;

const StyledSettingMenu = styled.div`
  position: fixed;
  z-index: 2;
  top: 3.5rem;
  right: 1rem;
  width: 150px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StyledSettingItem = styled.div`
  width: 100%;
  padding: 0.5rem 0;
`;

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StudySettingBtn = ({ studyId, token, memberId }) => {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  const onClickSettingBtn = () => {
    setClick(!click);
  };

  const onClickWithdrawStudy = () => {
    if (window.confirm('스터디를 탈퇴 하시겠습니까?')) {
      dispatch({
        type: WITHDRAW_STUDY_REQUEST,
        data: {
          token,
          memberId,
        },
      });
    }
  };

  return (
    <div>
      <StyledSettingBtn type="button" onClick={onClickSettingBtn}>
        <img src="/static/icon-setting.svg" alt="setting icon" />
      </StyledSettingBtn>
      <StyledSettingMenu show={click}>
        <StyledSettingItem>
          <Link
            route={`/studyInvite/${studyId}`}
            href={`/studyInvite/${studyId}`}
          >
            <a>초대 링크 생성</a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem>
          <Link
            route={`/editStudy/${studyId}`}
            href={`/editStudy/${studyId}`}
          >
            <a>스터디 수정</a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem onClick={onClickWithdrawStudy}>
          스터디 나가기
        </StyledSettingItem>
      </StyledSettingMenu>
      <StyledBackground show={click} />
    </div>
  );
};

StudySettingBtn.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  memberId: PropTypes.number.isRequired,
}

export default StudySettingBtn;