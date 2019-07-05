import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

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
  const [password1, setPassword1] = useInput('');
  const [password2, setPassword2] = useInput('');
  // const [type, setType] = useInput('email');
  const type = 'email';
  const [phoneNumber, setPhoneNumber] = useInput('');

  const dispatch = useDispatch();

  const onSubmit = async e => {
    e.preventDefault();
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { username, password1, password2, type, email, phoneNumber },
    });
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
