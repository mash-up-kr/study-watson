import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '../routes';

const StyledSettingBtn = styled.button`
  position: absolute;
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
  left: 0;
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

const MemberSettingBtn = ({ studyId }) => {
  const [click, setClick] = useState(false);

  const onClickSettingBtn = () => {
    setClick(!click);
  };

  const closeMenu = () => {
    setClick(!click);
  }

  return (
    <div>
      <StyledSettingBtn type="button" onClick={onClickSettingBtn}>
        <img src="/static/icon-setting.svg" alt="setting icon" />
      </StyledSettingBtn>
      <StyledSettingMenu show={click}>
        <StyledSettingItem>
          <Link route={`/manager/${studyId}`} href={`/manager/${studyId}`}>
            <a>
              <StyledLabel>
                스터디 리더 임명
              </StyledLabel>
            </a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem>
          <Link route={`/subManager/${studyId}`} href={`/subManager/${studyId}`}>
            <a>
              <StyledLabel>
                스터디 서브 리더 임명
              </StyledLabel>
            </a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem>
          <Link route={`/normal/${studyId}`} href={`/normal/${studyId}`}>
            <a>
              <StyledLabel>
                스터디 멤버 임명
              </StyledLabel>
            </a>
          </Link>
        </StyledSettingItem>
        <StyledSettingItem>
          <Link route={`/withdrawStudy/${studyId}`} href={`/withdrawStudy/${studyId}`}>
            <a>
              <StyledLabel>
                스터디 멤버 제명
              </StyledLabel>
            </a>
          </Link>
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

MemberSettingBtn.propTypes = {
  studyId: PropTypes.string.isRequired,
}

export default MemberSettingBtn;