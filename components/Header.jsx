import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'

import { Link } from '../routes';
import Menu from './Menu'
import { canUseDOM } from '../common/canUesDOM'

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #EDEDED;
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
  const [value, setValue] = useState(false)

  const { isLogin } = useSelector(state => state.user)

  const onClick = () => {
    setValue(!value);
  }
  const path = canUseDOM() && window.location.pathname;
  // const isA = path.length > 0 && path.includes('profile')
  let link = '';
  let label = ''
  switch (path) {
    case '/profile':
      link = '/profile-edit';
      label = '프로필 수정';
      break;
    case '/':
      if (!isLogin) {
        link = '/login';
        label = '로그인';
      }
      break;
    default:
      break;
  }
  return (
    <>
      <StyledHeader>
        <StyledButton type="button" onClick={onClick}><img src='/static/icon-menu.svg' alt='menu icon' /></StyledButton>
        <Link route='/' href='/'>
          <img src='/static/logo.svg' alt='logo' />
        </Link>
        <StyledRightButton>
          <Link route={link} href={link}>{label}</Link>
        </StyledRightButton>
      </StyledHeader>
      <Menu value={value} />
    </>
  )
}

export default Header;