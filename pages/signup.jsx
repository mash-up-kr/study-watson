import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import axios from 'axios';

// import fb from '../firebase';
import Header from '../components/Header';
import Start from '../components/Start';
import { SIGN_UP } from '../reducers/user';
import { useInput } from '../common/useInput';
import {
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledForm,
} from '../common/StyledComponents';

const StyledGoogleButton = styled.button`
  position: fixed;
  bottom: 1rem;
  width: calc(100% - 2rem);
  padding: 1rem 0;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledComplete = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignUpEnd = () => {
  const onClick = () => {
    Router.pushRoute('/');
  };

  return (
    <StyledComplete>
      <img
        src="/static/icon-complete.svg"
        alt="complete icon"
        style={{ marginBottom: '1rem' }}
      />
      <div>회원가입이 완료되었습니다!</div>
      <StyledButton type="button" value="홈으로" onClick={onClick} />
    </StyledComplete>
  );
};

export const SignUpData = ({ changeDepth }) => {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password1, setPassword1] = useInput('');
  const [password2, setPassword2] = useInput('');
  const [type, setType] = useInput('');
  const [phone, setPhone] = useInput('');

  const dispatch = useDispatch();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'https://study-watson.lhy.kr/api/v1/members/',
        {
          username: name,
          password1,
          password2,
          type,
          email,
          phoneNumber: phone,
        },
      );
      console.log(111, result.data);

      const json = {
        id: result.data.pk,
        name: result.data.username,
        email: result.data.email,
        phone: result.data.phoneNumber,
      };
      dispatch({
        type: SIGN_UP,
        ...json,
      });
      localStorage.setItem('user', JSON.stringify({ ...json }));
      changeDepth(2);
    } catch (error) {
      console.log(222, error.response);
    }

    // dispatch({
    //   type: SIGN_UP,
    //   id,
    //   name,
    //   email,
    //   phone,
    // });
    // localStorage.setItem('user', JSON.stringify({ id, name, email, phone }));
    // fb()
    //   .firestore()
    //   .collection('users')
    //   .doc('sample_user')
    //   .set(form)
    //   .then(res => console.log(res))
    //   .then(() => console.log('signup success'))
    //   .catch(e => console.log(e));
  };

  return (
    <StyledScreen>
      <StyledTitle>회원가입</StyledTitle>
      <StyledForm>
        <div>
          <StyledLabel htmlFor="name">이름</StyledLabel>
          <StyledInput id="name" type="text" value={name} onChange={setName} />
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
          <StyledLabel htmlFor="phone">전화번호</StyledLabel>
          <StyledInput
            id="phone"
            type="text"
            value={phone}
            onChange={setPhone}
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
        <div>
          <StyledLabel htmlFor="type">type</StyledLabel>
          <StyledInput id="type" type="text" value={type} onChange={setType} />
        </div>
        <StyledButton type="button" value="완료" onClick={onSubmit} />
      </StyledForm>
    </StyledScreen>
  );
};

SignUpData.propTypes = {
  changeDepth: PropTypes.func.isRequired,
};

const SignupStart = ({ changeDepth }) => {
  return (
    <StyledContainer>
      <Start />
      <StyledGoogleButton onClick={() => changeDepth(1)}>
        <img
          src="/static/icon-google.svg"
          alt="google logo"
          style={{ marginRight: '1rem' }}
        />
        Google로 시작하기
      </StyledGoogleButton>
    </StyledContainer>
  );
};

SignupStart.propTypes = {
  changeDepth: PropTypes.func.isRequired,
};

const Signup = () => {
  const [depth, setDepth] = useState(0);

  const changeDepth = to => {
    setDepth(to);
  };

  if (depth === 2) {
    return (
      <div>
        <Header />
        <SignUpEnd />
      </div>
    );
  }

  if (depth === 1) {
    return (
      <div>
        <Header />
        <SignUpData changeDepth={changeDepth} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <SignupStart changeDepth={changeDepth} />
    </div>
  );
};

export default Signup;
