import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import { useInput } from '../common/useInput'

const StyledPhoto = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #595959;
`;

const StyledInput = styled.input`
  border: 1px solid #EDEDED;
  width: 100%;
  padding: 1rem 0;
  font-size: 1rem;
`;

const StyledButton = styled.input`
  width: 100%;
  padding: 1rem 0;
  background-color: #0077FF;
  font-size: 1rem;
  color: #fff;
  position: fixed;
  bottom: 0;
`;

const Index = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { name, email, phone } = user;

  const [inputName, setInputName] = useInput(name);
  const [inputEmail, setInputEmail] = useInput(email);
  const [inputPhone, setInputPhone] = useInput(phone);

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_USER',
      payload: {
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
      }
    })
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Header />
      <div>
        <StyledPhoto />
        <form onSubmit={onSubmit}>
          <label htmlFor='name'>이름</label>
          <StyledInput type='text' id='name' value={inputName} onChange={setInputName} />
          <label htmlFor='email'>이메일</label>
          <StyledInput type='text' id='email' value={inputEmail} onChange={setInputEmail} />
          <label htmlFor='phone'>전화번호</label>
          <StyledInput type='text' id='phone' value={inputPhone} onChange={setInputPhone} />
          <StyledButton type='submit' value='저장' />
        </form>
      </div>
    </div>
  );
};

export default Index;