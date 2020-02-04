import React, { useCallback, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  StyledButton,
  StyledImageText,
  StyledActionButton,
} from '../../common/StyledComponents';
import { Link } from '../../routes';

const StyledContainer = styled.div`
  height: calc(100vh - 56px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled.input`
  border: 1px solid #ededed;
  width: calc(100% - 32px);
  padding: 1rem;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-radius: 8px;
  color: #4d5256;
`;

const StyledToast = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #595959;
  color: #fff;
  position: fixed;
  bottom: 3rem;
  font-size: 0.9rem;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 2rem;
`;

const StudyInviteForm = ({ studyId, token }) => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('링크를 생성해주세요');

  const getUrl = useCallback(async () => {
    const result = await axios.post(
      'https://study-watson.lhy.kr/api/v1/study/invite-token/',
      {
        study: studyId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      },
    );
    const value = `${window.location.host}/join/${result.data.key}`;
    setUrl(value);
  }, []);

  const clickLink = useCallback(async () => {
    await getUrl();
  }, []);

  const onClickLink = useCallback(() => {
    document.querySelector('#url').select();
    document.execCommand('copy');
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }, []);

  return (
    <StyledContainer>
      <StyledImage src="/static/image_invite.png" alt="invite illustration" />
      <StyledImageText>
        링크를 공유해서
        <br />
        스터디원을 초대해보세요!
      </StyledImageText>
      <StyledLink
        type="text"
        value={url}
        id="url"
        onClick={onClickLink}
        readOnly
      />
      <StyledActionButton
        onClick={clickLink}
        name="make"
        type="button"
        value="링크 생성"
      />
      {show && <StyledToast>링크가 복사되었습니다!</StyledToast>}
    </StyledContainer>
  );
};

StudyInviteForm.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default StudyInviteForm;
