import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { SIGN_UP_REQUEST } from '../reducers/user';
import Input from './Input';
import {
  StyledButton,
  StyledTitle,
  StyledForm,
} from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`;

const SignUpData = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPassword1Valid, setIsPassword1Valid] = useState(false);
  const [isPassword2Valid, setIsPassword2Valid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const [focus, setFocus] = useState('');

  const dispatch = useDispatch();

  const type = 'email';

  const checkEmail = e => {
    setEmail(e.target.value);
    const emailChecker = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (emailChecker.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const checkPassword1 = e => {
    setPassword1(e.target.value);
    const passwordChecker = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if (passwordChecker.test(e.target.value)) {
      setIsPassword1Valid(true);
    } else {
      setIsPassword1Valid(false);
    }
  };

  const checkPassword2 = e => {
    setPassword2(e.target.value);
    if (password1 === e.target.value) {
      setIsPassword2Valid(true);
    } else {
      setIsPassword2Valid(false);
    }
  };

  const checkNickname = e => {
    setNickname(e.target.value);
    const nickNameChecker = /^.*(?=.{2,8}).*$/;
    if (nickNameChecker.test(e.target.value)) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  };

  const checkPhoneNumber = e => {
    setPhoneNumber(e.target.value);
    const value = e.target.value.split('-').join('');
    const phoneNumberChecker = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
    if (phoneNumberChecker.test(value)) {
      setIsPhoneNumberValid(true);
    } else {
      setIsPhoneNumberValid(false);
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const result = await axios.post(
        'https://study-watson.lhy.kr/api/v1/members/available/',
        {
          attributeName: 'email',
          value: email,
        },
      );
      if (result.data.exists === true) {
        alert('이미 사용중인 이메일 입니다.');
        return;
      }
    } catch (error) {
      console.error(error);
      alert('이미 사용중인 이메일 입니다.');
      return;
    }

    if (isEmailValid === false) {
      alert('올바른 이메일 형식을 입력해주세요');
      return;
    }
    if (isPassword1Valid === false) {
      alert('올바른 비밀번호를 입력해주세요');
      return;
    }
    if (isPassword2Valid === false) {
      alert('비밀번호를 다시 한 번 확인해주세요');
      return;
    }
    if (isNicknameValid === false) {
      alert('올바른 이름을 입력해주세요');
      return;
    }
    if (isPhoneNumberValid === false) {
      alert('올바른 전화번호를 입력해주세요');
      return;
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        username: email,
        password1,
        password2,
        type,
        email,
        phoneNumber,
        nickname,
      },
    });
  };

  const onClickInput = value => {
    setFocus(value);
  };

  return (
    <StyledScreen>
      <StyledTitle>회원가입</StyledTitle>
      <StyledForm onSubmit={onSubmit}>
        <Input
          label="이메일"
          id="email"
          type="text"
          placeholder="example@studywatson.com"
          onChange={checkEmail}
          onClickReset={() => setEmail('')}
          onClickInput={() => onClickInput('email')}
          isValid={isEmailValid}
          focus={focus}
          value={email}
          acceptableText="사용 가능한 이메일입니다"
          unacceptableText="올바른 이메일 형식을 입력해주세요"
        />
        <Input
          label="비밀번호"
          id="password1"
          type="password"
          placeholder="비밀번호"
          onChange={checkPassword1}
          onClickReset={() => setPassword1('')}
          onClickInput={() => onClickInput('password1')}
          isValid={isPassword1Valid}
          focus={focus}
          value={password1}
          acceptableText="사용 가능한 비밀번호입니다"
          unacceptableText="영문, 숫자를 포함한 8자리 이상의 비밀번호를 설정해주세요"
        />
        <Input
          label="비밀번호 확인"
          id="password2"
          type="password"
          placeholder="비밀번호 확인"
          onChange={checkPassword2}
          onClickReset={() => setPassword2('')}
          onClickInput={() => onClickInput('password2')}
          isValid={isPassword2Valid}
          focus={focus}
          value={password2}
          acceptableText="확인 되었습니다"
          unacceptableText="다시 한 번 확인해주세요"
        />
        <Input
          label="이름"
          id="nickname"
          type="text"
          placeholder="이름"
          onChange={checkNickname}
          onClickReset={() => setNickname('')}
          onClickInput={() => onClickInput('nickname')}
          isValid={isNicknameValid}
          focus={focus}
          value={nickname}
          acceptableText="사용 가능한 이름입니다"
          unacceptableText="2~8자의 이름을 입력해주세요"
        />
        <Input
          label="전화번호"
          id="phoneNumber"
          type="text"
          placeholder="전화번호"
          onChange={checkPhoneNumber}
          onClickReset={() => setPhoneNumber('')}
          onClickInput={() => onClickInput('phoneNumber')}
          isValid={isPhoneNumberValid}
          focus={focus}
          value={phoneNumber}
          acceptableText="사용 가능한 전화번호입니다"
          unacceptableText="올바른 전화번호를 입력해주세요"
        />
        <StyledButton type="submit" value="완료" />
      </StyledForm>
    </StyledScreen>
  );
};

export default SignUpData;
