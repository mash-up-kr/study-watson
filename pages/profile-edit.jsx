import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../containers/Header';
import { useInput } from '../common/useInput';
import { EDIT_USER_REQUEST } from '../reducers/user';
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
  const { pk, username, email, phoneNumber } = useSelector(state => state.user);

  const [imgProfile, setImgProfile] = useState('');
  const [inputName, setInputName] = useInput(username);
  const [inputEmail, setInputEmail] = useInput(email);
  const [inputPhone, setInputPhone] = useInput(phoneNumber);

  const onChangeFile = e => {
    const reader = new FileReader();
    reader.onload = () => {
      setImgProfile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: EDIT_USER_REQUEST,
      data: {
        pk,
        imgProfile,
        username: inputName,
        email: inputEmail,
        phoneNumber: inputPhone,
      },
    });
  };

  return (
    <StyledProfileEdit>
      <Header />
      <div>
        <StyledPhoto />
        <form onSubmit={onSubmit}>
          <label htmlFor="image">image</label>
          <StyledInput
            type="file"
            id="image"
            // value={inputName}
            onChange={onChangeFile}
          />
          <div>
            <img src={imgProfile} alt="" />
          </div>
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
