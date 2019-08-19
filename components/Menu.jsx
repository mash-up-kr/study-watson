import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import LogoutMenu from './LogoutMenu';
import LoginMenu from './LoginMenu';

const Menu = ({ value, show }) => {
  const { isLogin } = useSelector(state => state.user);
  return isLogin ? <LoginMenu value={value} show={show} /> : <LogoutMenu value={value} show={show} />;
};

Menu.propTypes = {
  value: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
};

export default Menu;
