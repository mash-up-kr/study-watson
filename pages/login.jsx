import React, {useState} from 'react';
import styled from "styled-components";

import Header from '../components/Header.jsx';

const Index = () => {

  const [click, isClicked] = useState(false);

  const goLogin = () => {
    isClicked(true);
    console.log("구글로 로그인하러 가기");
  };

  return (
    <div>
      <Header/>
      <div>로그인</div>
      <Btn onClick={goLogin}>Google로 시작하기</Btn>
    </div>
  )
};

const Btn = styled.button`
  background-color: blue;
  color: white;
`;

export default Index;