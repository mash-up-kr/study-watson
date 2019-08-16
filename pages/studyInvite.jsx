import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  StyledButton,
  StyledImageText,
  StyledActionButton,
} from '../common/StyledComponents';
import { Link } from '../routes';
import Header from '../containers/Header';

const StyledContainer = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled.input`
  border: 1px solid #ededed;
  width: 100%;
  padding: 1rem;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-radius: 8px;
  color: #4D5256;
`;


const StyledToast = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #595959;
  color: #fff;
  position: fixed;
  bottom: 60px;
  font-size: 14px;
  text-align: center;
`;

const StudyInvite = ({ studyId, token }) => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('링크를 생성해주세요');

  const getUrl = async () => {
    const result = await Axios.post(
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
  };

  const clickLink = async () => {
    await getUrl();
  };

  const onClickLink = () => {
    document.querySelector('#url').select();
    document.execCommand('copy');
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <div>
      <Header />
      <StyledContainer>
        <img
          src="/static/image_invite.svg"
          alt="invite illustration"
          style={{ marginBottom: '1rem' }}
        />
        <StyledImageText>
          링크를 공유해서
          <br />
          스터디원을 초대해보세요!
        </StyledImageText>
        <StyledLink
          type="text"
          value={url}
          id="url"
          onClick={() => {
            onClickLink();
          }}
          readOnly
        />
        <StyledActionButton onClick={clickLink} name="make" type="button" value="링크 생성" />
        {show && <StyledToast>링크가 복사되었습니다!</StyledToast>}
        <br />
        <Link route="/" href="/">
          <a>
            <StyledButton type="button" value="홈으로 돌아가기" />
          </a>
        </Link>
      </StyledContainer>
    </div>
  );
};
StudyInvite.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
StudyInvite.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  return { studyId, token };
};

export default StudyInvite;
