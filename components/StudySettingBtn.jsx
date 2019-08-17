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
  z-index: 4;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
`;

const StyledSettingMenu = styled.div`
  position: fixed;
  z-index: 4;
  bottom: 0;
  width: 100%;
  padding: 0 1rem;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(100%)')};
  transform-origin: bottom;
  transition: all 0.3s ease-in-out;
`;

const StyledSettingItem = styled.div`
  width: 100%;
  padding: 0.8rem 0;
  & :last-child {
    border-top: 1px solid #EDEDED;
  }
`;

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const StyledLabel = styled.span`
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #4D5256;
`;

const StyledIcon = styled.img`
  margin-right: 1rem;
`;

const StudySettingBtn = ({ studyId, token, memberId }) => {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  const onClickSettingBtn = () => {
    setClick(!click);
  };

  const closeMenu = () => {
    setClick(!click);
  }

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
            <a>
              <StyledLabel>
                <StyledIcon
                  src="/static/icon-invite.svg"
                  alt="invite icon"
                />
                스터디 멤버 초대하기
              </StyledLabel>
            </a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem>
          <Link
            route={`/editStudy/${studyId}`}
            href={`/editStudy/${studyId}`}
          >
            <a>
              <StyledLabel>
                <StyledIcon
                  src="/static/icon-edit.svg"
                  alt="edit icon"
                />
                스터디 정보 수정
              </StyledLabel>
            </a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem onClick={onClickWithdrawStudy}>
          <StyledLabel>
            <StyledIcon
              src="/static/icon-logout.svg"
              alt="logout icon"
            />
            스터디 나가기
          </StyledLabel>
        </StyledSettingItem>
        <StyledSettingItem onClick={closeMenu}>
          <StyledLabel>
            <StyledIcon
              src="/static/icon-close.svg"
              alt="close icon"
            />
            취소
          </StyledLabel>
        </StyledSettingItem>
      </StyledSettingMenu>
      <StyledBackground show={click} onClick={closeMenu} />
    </div>
  );
};

StudySettingBtn.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  memberId: PropTypes.number.isRequired,
}

export default StudySettingBtn;