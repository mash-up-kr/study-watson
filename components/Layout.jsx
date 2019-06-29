import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { LOG_IN } from '../reducers/user';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      dispatch({
        type: LOG_IN,
        ...user,
      });
    }
  });

  return <div>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
