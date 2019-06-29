import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import fb from '../firebase';

import {SIGN_UP} from '../reducers/user';

const Input = styled.input`
  color: blue;
`;

const Btn = styled.button`
  background-color: blue;
  color: white;
`;


const Index = () => {
  const [click, isClicked] = useState(false);

  const BtnIsClicked = () => {
    isClicked(true);
    console.log("구글로 회원가입하러 가기");
  };

  return click
    ? <SignUpData />
    : (
    <div>
      <div>
        회원가입
      </div>
      <Btn onClick={BtnIsClicked}>Google로 시작하기</Btn>
    </div>
  )
};

export const SignUpData = () => {
  const [click, isClicked] = useState(false);
  const [form, setValues] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
  });
  const user = useSelector(state=> state.user);
  console.log(user);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      userId: Math.random(),
      [e.target.name]: e.target.value
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
    fb().firestore().collection('users').doc('sample_user').set(form)
      .then(res => console.log(res))
      .then(() => console.log("signup success"))
      .catch(e => console.log(e));
    isClicked(true);
    console.log(form);
    console.log("회원가입 완료");

  };



  return click
  ? <SignUpEnd />
    : ( <div>
      <form>
        <div>
          <div>name</div>
          <Input type="text" value={form.userName} name={"userName"} onChange={onChange}/>
        </div>
        <div>
          <div>email</div>
          <Input type="text" value={form.userEmail} name={"userEmail"} onChange={onChange}/>
        </div>
        <div>
          <div>phone number</div>
          <Input type="text" value={form.userPhone} name={"userPhone"} onChange={onChange}/>
        </div>
        <Btn onClick={onSubmit}>완료</Btn>
      </form>
    </div> )
};

export const SignUpEnd = () => {
  const [click, isClicked] = useState(false);

  const BtnIsClicked = () => {
    isClicked(true);
    console.log("홈으로 가기");
  };

  return (
    <div>
      <div>
        회원가입이 완료되었습니다.
      </div>
      <Btn isClick={BtnIsClicked}>
        홈으로
      </Btn>
    </div>
  )
};

export default Index;