import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { SIGN_UP_REQUEST } from '../reducers/user';
import { useInput } from '../common/useInput';
import {
  StyledButton,
  StyledLabel,
  StyledInput,
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

const StyledInputContainer = styled.div`
  margin-bottom: 2rem;
`;

const StyledHelpText = styled.span`
  font-size: 0.8rem;
  color: #595959;
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

  const [emailConfirm, setEmailConfirm] = useState(false);
  // const [type, setType] = useInput('email');
  const type = 'email';


  const dispatch = useDispatch();

  const checkEmail = e => {
    setEmail(e.target.value)
    const emailChecker = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (emailChecker.test(e.target.value)) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    };
  }

  const checkPassword1 = e => {
    setPassword1(e.target.value)
    const passwordChecker = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if (passwordChecker.test(e.target.value)) {
      setIsPassword1Valid(true)
    } else {
      setIsPassword1Valid(false)
    }
  }

  const checkPassword2 = e => {
    setPassword2(e.target.value)
    if (password1 === e.target.value) {
      setIsPassword2Valid(true)
    } else {
      setIsPassword2Valid(false)
    }
  }

  const checkNickname = e => {
    setNickname(e.target.value)
    const nickNameChecker = /^.*(?=.{2,8}).*$/;
    if (nickNameChecker.test(e.target.value)) {
      setIsNicknameValid(true)
    } else {
      setIsNicknameValid(false)
    }
  }

  const checkPhoneNumber = e => {
    setPhoneNumber(e.target.value)
    const value = e.target.value.split('-').join('');
    const phoneNumberChecker = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
    if (phoneNumberChecker.test(value)) {
      setIsPhoneNumberValid(true)
    } else {
      setIsPhoneNumberValid(false)
    }
  }

  const onSubmit = async e => {
    if (isEmailValid === true && isPassword1Valid === true && isPassword2Valid === true && isNicknameValid === true && isPhoneNumberValid === true) {
      e.preventDefault();
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
    } else if (isEmailValid === false) {
      alert('올바른 이메일 형식을 입력해주세요');
    } else if (isPassword1Valid === false) {
      alert('올바른 비밀번호를 입력해주세요');
    } else if (isPassword2Valid === false) {
      alert('비밀번호를 다시 한 번 확인해주세요');
    } else if (isNicknameValid === false) {
      alert('올바른 이름을 입력해주세요')
    } else if (isPhoneNumberValid === false) {
      alert('올바른 전화번호를 입력해주세요')
    }
  };

  const onClick = async () => {
    try {
      const result = await axios.post(
        'https://study-watson.lhy.kr/api/v1/members/available/',
        {
          attributeName: 'email',
          value: email,
        },
      );
      console.log(result);
      if (result.data !== true) {
        setEmailConfirm(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledScreen>
      <StyledTitle>회원가입</StyledTitle>
      <StyledForm>
        <StyledInputContainer>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            type="text"
            id="email"
            placeholder="example@studywatson.com"
            value={email}
            onChange={checkEmail}
          />
          <StyledHelpText>{isEmailValid ? '사용 가능한 이메일입니다' : '올바른 이메일 형식을 입력해주세요'}</StyledHelpText>
          {/* <StyledInput
            id="username"
            type="button"
            value="중복 확인"
            onClick={onClick}
          />
          <div>{emailConfirm ? '사용가능' : '사용불가'}</div> */}
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="password1">비밀번호</StyledLabel>
          <StyledInput
            id="password1"
            type="password"
            placeholder="비밀번호"
            value={password1}
            onChange={checkPassword1}
          />
          <StyledHelpText>{isPassword1Valid ? '사용 가능한 비밀번호입니다' : '영문, 숫자를 포함한 8자리 이상의 비밀번호를 설정해주세요'}</StyledHelpText>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="password2">비밀번호 확인</StyledLabel>
          <StyledInput
            id="password2"
            type="password"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={checkPassword2}
          />
          <StyledHelpText>{isPassword2Valid ? '확인 되었습니다' : '다시 한 번 확인해주세요'}</StyledHelpText>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="nickname">이름</StyledLabel>
          <StyledInput
            id="nickname"
            type="text"
            placeholder="이름"
            value={nickname}
            onChange={checkNickname}
          />
          <StyledHelpText>{isNicknameValid ? '사용 가능한 이름입니다' : '2~8자의 이름을 입력해주세요'}</StyledHelpText>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="phoneNumber">전화번호</StyledLabel>
          <StyledInput
            id="phoneNumber"
            type="text"
            placeholder="전화번호"
            value={phoneNumber}
            onChange={checkPhoneNumber}
          />
          <StyledHelpText>{isPhoneNumberValid ? '사용 가능한 전화번호입니다' : '올바른 전화번호를 입력해주세요'}</StyledHelpText>
        </StyledInputContainer>
        {/* <div>
          <StyledLabel htmlFor="type">type</StyledLabel>
          <StyledInput id="type" type="text" value={type} onChange={setType} />
        </div> */}
        <StyledButton type="button" value="완료" onClick={onSubmit} />
      </StyledForm>
    </StyledScreen>
  );
};

export default SignUpData;
