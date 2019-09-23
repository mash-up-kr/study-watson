import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useInput } from '../../common/useInput';
import { EDIT_USER_REQUEST } from '../../reducers/user';
import {
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledInputContainer,
  StyledForm,
} from '../../common/StyledComponents';

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

const EditProfileForm = ({ user }) => {
  const [inputImgProfile, setInputImgProfile] = useState(user.imgProfile);
  const [inputNickname, setInputNickname] = useInput(user.nickname);
  const [inputEmail, setInputEmail] = useInput(user.email);
  const [inputPhone, setInputPhone] = useInput(user.phoneNumber);

  const dispatch = useDispatch();

  const onChangeFile = useCallback(e => {
    const reader = new FileReader();
    reader.onload = () => {
      setInputImgProfile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }, []);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    let img = inputImgProfile
    if (inputImgProfile === user.imgProfile) {
      img = null
    }
    dispatch({
      type: EDIT_USER_REQUEST,
      data: {
        pk: user.pk,
        imgProfile: img,
        email: inputEmail,
        phoneNumber: inputPhone,
        nickname: inputNickname,
      },
    });
  }, [inputImgProfile, inputNickname, inputEmail, inputPhone]);

  return (
    <StyledProfileEdit>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <StyledPhoto src={inputImgProfile} alt="" />
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
  );
};

EditProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
};


export default EditProfileForm;
