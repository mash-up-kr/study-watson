import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

// import fb from '../firebase';
import Header from '../components/Header';
import { SIGN_UP } from '../reducers/user';
import { useInput } from '../common/useInput';

const StyledInput = styled.input`
  color: blue;
`;

const StyledButton = styled.button`
  background-color: blue;
  color: white;
`;

export const SignUpEnd = () => {
  const onClick = () => {
    Router.pushRoute('/');
  };

  return (
    <div>
      <div>회원가입이 완료되었습니다.</div>
      <StyledButton onClick={onClick}>홈으로</StyledButton>
    </div>
  );
};

export const SignUpData = ({ changeDepth }) => {
  const uid = uuidv4();
  const [id] = useInput(uid);
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [phone, setPhone] = useInput('');

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: SIGN_UP,
      id,
      name,
      email,
      phone,
    });
    localStorage.setItem('user', JSON.stringify({ id, name, email, phone }));
    // fb()
    //   .firestore()
    //   .collection('users')
    //   .doc('sample_user')
    //   .set(form)
    //   .then(res => console.log(res))
    //   .then(() => console.log('signup success'))
    //   .catch(e => console.log(e));
    changeDepth(2);
  };

  return (
    <form>
      <div>
        <label htmlFor="name">name</label>
        <StyledInput id="name" type="text" value={name} onChange={setName} />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <StyledInput type="text" id="email" value={email} onChange={setEmail} />
      </div>
      <div>
        <label htmlFor="phone">phone number</label>
        <StyledInput id="phone" type="text" value={phone} onChange={setPhone} />
      </div>
      <StyledButton onClick={onSubmit}>완료</StyledButton>
    </form>
  );
};

SignUpData.propTypes = {
  changeDepth: PropTypes.func.isRequired,
};

const SignupStart = ({ changeDepth }) => {
  return (
    <div>
      <div>회원가입</div>
      <StyledButton onClick={() => changeDepth(1)}>
        Google로 시작하기
      </StyledButton>
    </div>
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
    return <SignUpEnd />;
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
