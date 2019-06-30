import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import LogoutMenu from './LogoutMenu';
import LoginMenu from './LoginMenu';

const Menu = ({ value }) => {
  const { isLogin, name } = useSelector(state => state.user);
  return isLogin ? (
    <LoginMenu name={name} value={value} />
  ) : (
    <LogoutMenu value={value} />
  );
};

Menu.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default Menu;
