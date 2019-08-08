import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Link } from '../routes';
import Menu from '../components/Menu';

const StyledHeader = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #ededed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.div`
  position: absolute;
  left: 1rem;
  z-index: 10;
`;

const StyledRightButton = styled.div`
  position: absolute;
  right: 1rem;
`;

const Header = () => {
  const [value, setValue] = useState(false);
  const [link, setLink] = useState('');
  const [label, setLabel] = useState('');

  const { isLogin } = useSelector(state => state.user);

  const onClick = () => {
    setValue(!value);
  };

  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/profile':
        setLink('/profile-edit');
        setLabel('프로필 수정');
        break;
      case '/':
        if (!isLogin) {
          setLink('/login');
          setLabel('로그인');
        } else {
          setLink('');
          setLabel('');
        }
        break;
      default:
        setLink('');
        setLabel('');
        break;
    }
  });

  return (
    <>
      <StyledHeader>
        <StyledButton type="button" onClick={onClick}>
          <img src="/static/icon-menu.svg" alt="menu icon" />
        </StyledButton>
        <Link route="/" href="/">
          <a>
            <img src="/static/logo.svg" alt="logo" />
          </a>
        </Link>
        <StyledRightButton>
          <Link route={link} href={link}>
            <a>{label}</a>
          </Link>
        </StyledRightButton>
      </StyledHeader>
      <Menu value={value} />
    </>
  );
};

export default Header;
