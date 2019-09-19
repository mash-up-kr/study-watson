import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import LogoutMenu from './LogoutMenu';
import LoginMenu from './LoginMenu';

const Menu = ({ value, show, user }) => {
  return !!user.pk ? <LoginMenu value={value} show={show} user={user} /> : <LogoutMenu value={value} show={show} />;
};

Menu.propTypes = {
  value: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Menu;
