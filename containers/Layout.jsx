import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { canUseDOM } from '../common/canUesDOM';

import { LOAD_USER_REQUEST } from '../reducers/user';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      canUseDOM() &&
      localStorage.getItem('token') &&
      localStorage.getItem('token').length > 0
    ) {
      const key = localStorage.getItem('token');
      dispatch({
        type: LOAD_USER_REQUEST,
        key,
      });
    }
  }, []);

  return <div>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
