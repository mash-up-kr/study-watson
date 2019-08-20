import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../containers/Header';
import { useInput } from '../common/useInput';
import { EDIT_USER_REQUEST } from '../reducers/user';
import {
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledInputContainer,
  StyledForm,
} from '../common/StyledComponents';

const StyledProfileEdit = styled.div`
  width: calc(100vw - 2rem);
  margin: auto;
  padding-bottom: 2rem;
`;

const StyledPhoto = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #595959;
  margin: 1.5rem 0 1.5rem 0;
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
    <>
      <Header />
      <StyledProfileEdit>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <StyledPhoto src={inputImgProfile || imgProfile} alt="" />
          <StyledForm onSubmit={onSubmit}>
            <StyledInputContainer>
              <StyledLabel htmlFor="image">프로필 이미지</StyledLabel>
              <StyledInput type="file" id="image" onChange={onChangeFile} />
            </StyledInputContainer>
            <StyledInputContainer>
              <StyledLabel htmlFor="nickname">이름</StyledLabel>
              <StyledInput
                type="text"
                id="nickname"
                value={inputNickname}
                onChange={setInputNickname}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <StyledLabel htmlFor="email">이메일</StyledLabel>
              <StyledInput
                type="text"
                id="email"
                value={inputEmail}
                onChange={setInputEmail}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <StyledLabel htmlFor="phone">전화번호</StyledLabel>
              <StyledInput
                type="text"
                id="phone"
                value={inputPhone}
                onChange={setInputPhone}
              />
            </StyledInputContainer>
            <StyledButton type="submit" value="저장" />
          </StyledForm>
        </div>
      </StyledProfileEdit>
    </>
  );
};

export default profileEdit;
