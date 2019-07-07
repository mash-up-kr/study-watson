import React, { useState, useEffect } from 'react';
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

const StyledPhoto = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #595959;
`;

const profileEdit = () => {
  const dispatch = useDispatch();
  const { pk, nickname, email, phoneNumber, imgProfile } = useSelector(
    state => state.user,
  );

  const [inputImgProfile, setInputImgProfile] = useState('');
  const [inputNickname, setInputNickname] = useInput(nickname || '');
  const [inputEmail, setInputEmail] = useInput(email || '');
  const [inputPhone, setInputPhone] = useInput(phoneNumber || '');

  useEffect(() => {
    const n = {
      target: {
        value: nickname,
      },
    };
    setInputNickname(n);
    const e = {
      target: {
        value: email,
      },
    };
    setInputEmail(e);
    const p = {
      target: {
        value: phoneNumber,
      },
    };
    setInputPhone(p);
  }, [pk, nickname, email, phoneNumber, imgProfile]);

  const onChangeFile = e => {
    const reader = new FileReader();
    reader.onload = () => {
      setInputImgProfile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: EDIT_USER_REQUEST,
      data: {
        pk,
        imgProfile: inputImgProfile,
        email: inputEmail,
        phoneNumber: inputPhone,
        nickname: inputNickname,
      },
    });
  };

  return (
    <StyledProfileEdit>
      <Header />
      <div>
        <StyledPhoto src={inputImgProfile || imgProfile} alt="" />
        <form onSubmit={onSubmit}>
          <label htmlFor="image">image</label>
          <StyledInput type="file" id="image" onChange={onChangeFile} />
          <label htmlFor="nickname">nickname</label>
          <StyledInput
            type="text"
            id="nickname"
            value={inputNickname}
            onChange={setInputNickname}
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
