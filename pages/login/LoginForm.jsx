import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LOG_IN_REQUEST } from '../../reducers/user';
import { useInput } from '../../common/useInput';
import Input from '../../components/Input';
import { StyledForm, StyledTitle } from '../../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 1rem 0;
  background-color: #4B2BFF;
  font-size: 1rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
`;

const LoginForm = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledScreen>
      <StyledForm onSubmit={onSubmit}>
        <StyledTitle>로그인</StyledTitle>
        <Input
          label="이메일"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
          onClickReset={() => setEmail('')}
        />
        <Input
          label="비밀번호"
          id="password"
          type="password"
          value={password}
          onChange={setPassword}
          onClickReset={() => setPassword('')}
        />
        <StyledButton type="submit">로그인</StyledButton>
      </StyledForm>
    </StyledScreen>
  );
};

export default LoginForm;
