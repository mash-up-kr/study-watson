import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { SIGN_UP_REQUEST } from '../reducers/user';
import { useInput } from '../common/useInput';
import {
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledForm,
} from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpData = () => {
  const [username, setUsername] = useInput('');
  const [email, setEmail] = useInput('');
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [password1, setPassword1] = useInput('');
  const [password2, setPassword2] = useInput('');
  // const [type, setType] = useInput('email');
  const type = 'email';
  const [phoneNumber, setPhoneNumber] = useInput('');

  const dispatch = useDispatch();

  const onSubmit = async e => {
    if (emailConfirm === true) {
      e.preventDefault();
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { username, password1, password2, type, email, phoneNumber },
      });
    } else {
      alert('이메일 중복 체크가 필요합니다.');
    }
  };

  const onClick = async () => {
    try {
      const result = await axios.post(
        'https://study-watson.lhy.kr/api/v1/members/available/',
        {
          attributeName: 'email',
          value: email,
        },
      );
      console.log(result);
      if (result.data !== true) {
        setEmailConfirm(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledScreen>
      <StyledTitle>회원가입</StyledTitle>
      <StyledForm>
        <div>
          <StyledLabel htmlFor="username">이름</StyledLabel>
          <StyledInput
            id="username"
            type="text"
            value={username}
            onChange={setUsername}
          />
        </div>

        <div>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            type="text"
            id="email"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div>
          <StyledLabel htmlFor="username">이메일 중복 체크</StyledLabel>
          <StyledInput
            id="username"
            type="button"
            value="확인"
            onClick={onClick}
          />
        </div>
        <div>{emailConfirm ? '사용가능' : '사용불가'}</div>
        <div>
          <StyledLabel htmlFor="phoneNumber">전화번호</StyledLabel>
          <StyledInput
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <div>
          <StyledLabel htmlFor="password1">password1</StyledLabel>
          <StyledInput
            id="password1"
            type="text"
            value={password1}
            onChange={setPassword1}
          />
        </div>
        <div>
          <StyledLabel htmlFor="password2">password2</StyledLabel>
          <StyledInput
            id="password2"
            type="text"
            value={password2}
            onChange={setPassword2}
          />
        </div>
        {/* <div>
          <StyledLabel htmlFor="type">type</StyledLabel>
          <StyledInput id="type" type="text" value={type} onChange={setType} />
        </div> */}
        <StyledButton type="button" value="완료" onClick={onSubmit} />
      </StyledForm>
    </StyledScreen>
  );
};

export default SignUpData;
