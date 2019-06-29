import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

// import fb from '../firebase';
import Home from './index';
import Header from '../components/Header';
import { SIGN_UP } from '../reducers/user';

const StyledInput = styled.input`
  color: blue;
`;

const StyledButton = styled.button`
  background-color: blue;
  color: white;
`;

export const SignUpEnd = () => {
  const [click, isClicked] = useState(false);

  const BtnIsClicked = () => {
    isClicked(true);
    Router.pushRoute('/');
  };

  return click ? (
    <Home />
  ) : (
    <div>
      <Header />
      <div>회원가입이 완료되었습니다.</div>
      <StyledButton onClick={BtnIsClicked}>홈으로</StyledButton>
    </div>
  );
};

export const SignUpData = () => {
  const [click, isClicked] = useState(false);
  const [form, setValues] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
  });
  const user = useSelector(state => state.user);
  console.log(user);
  const dispatch = useDispatch();

  const onChange = e => {
    setValues({
      ...form,
      userId: Math.random(),
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: SIGN_UP,
      id: form.userId,
      name: form.userName,
      email: form.userEmail,
      phone: form.userPhone,
    });
    localStorage.setItem('user', JSON.stringify(form));
    // fb()
    //   .firestore()
    //   .collection('users')
    //   .doc('sample_user')
    //   .set(form)
    //   .then(res => console.log(res))
    //   .then(() => console.log('signup success'))
    //   .catch(e => console.log(e));
    isClicked(true);
  };

  return click ? (
    <SignUpEnd />
  ) : (
    <div>
      <Header />
      <form>
        <div>
          <div>name</div>
          <StyledInput
            type="text"
            value={form.userName}
            name="userName"
            onChange={onChange}
          />
        </div>
        <div>
          <div>email</div>
          <StyledInput
            type="text"
            value={form.userEmail}
            name="userEmail"
            onChange={onChange}
          />
        </div>
        <div>
          <div>phone number</div>
          <StyledInput
            type="text"
            value={form.userPhone}
            name="userPhone"
            onChange={onChange}
          />
        </div>
        <StyledButton onClick={onSubmit}>완료</StyledButton>
      </form>
    </div>
  );
};

const Signup = () => {
  const [click, isClicked] = useState(false);

  const BtnIsClicked = () => {
    isClicked(true);
  };

  return click ? (
    <SignUpData />
  ) : (
    <div>
      <Header />
      <div>회원가입</div>
      <StyledButton onClick={BtnIsClicked}>Google로 시작하기</StyledButton>
    </div>
  );
};

export default Signup;
