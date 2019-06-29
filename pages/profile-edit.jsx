import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import Header from '../components/Header';
import { useInput } from '../common/useInput';
import { EDIT_USER } from '../reducers/user';
import { StyledButton, StyledInput } from '../common/StyledComponents';

const StyledProfileEdit = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledPhoto = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #595959;
`;

const profileEdit = () => {
  const dispatch = useDispatch();
  const { name, email, phone } = useSelector(state => state.user);

  const [inputName, setInputName] = useInput(name);
  const [inputEmail, setInputEmail] = useInput(email);
  const [inputPhone, setInputPhone] = useInput(phone);

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: EDIT_USER,
      name: inputName,
      email: inputEmail,
      phone: inputPhone,
    });
    Router.pushRoute('/profile');
  };

  return (
    <StyledProfileEdit>
      <Header />
      <div>
        <StyledPhoto />
        <form onSubmit={onSubmit}>
          <label htmlFor="name">이름</label>
          <StyledInput
            type="text"
            id="name"
            value={inputName}
            onChange={setInputName}
          />
          <label htmlFor="email">이메일</label>
          <StyledInput
            type="text"
            id="email"
            value={inputEmail}
            onChange={setInputEmail}
          />
          <label htmlFor="phone">전화번호</label>
          <StyledInput
            type="text"
            id="phone"
            value={inputPhone}
            onChange={setInputPhone}
          />
          <StyledButton type="submit" value="저장" />
        </form>
      </div>
    </StyledProfileEdit>
  );
};

export default profileEdit;
