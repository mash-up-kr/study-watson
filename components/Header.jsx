import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Link } from '../routes';
import Menu from './Menu';

const StyledHeader = styled.div`
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: center;
  width: 100%;
`;

const StyledLeftButton = styled.div`
  left: 1rem;
  position: absolute;
  z-index: 1002;
`;

const StyledRightButton = styled.div`
  position: absolute;
  right: 1rem;
`;

const StyledBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.value ? 'block' : 'none')};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Header = ({ user }) => {
  const [value, setValue] = useState(false);
  const link = !!user.pk ? '' : '/login';
  const label = !!user.pk ? '' : '로그인';

  const onClick = useCallback(() => {
    setValue(!value);
  }, [value]);

  return (
    <>
      <StyledHeader>
        <StyledLeftButton type="button" onClick={onClick}>
          <img src="/static/icon-menu.svg" alt="menu icon" />
        </StyledLeftButton>
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
      <Menu value={value} show={onClick} user={user} />
      <StyledBackground value={value} onClick={onClick} />
    </>
  );
};

Header.propType = {
  user: PropTypes.object,
}

Header.defaultProps = {
  user: {
    pk: null,
  }
}

export default Header;
