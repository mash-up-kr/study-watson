import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '../routes';

const Menu = ({ menuHeight }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        height: `${menuHeight}`,
      }}
    >
      <div>
        <Link route="/" href="/">
          now
        </Link>
      </div>
      <div>
        <Link route="/session" href="/session">
          session
        </Link>
      </div>
      <div>
        <Link route="/my" href="/my">
          my
        </Link>
      </div>
    </div>
  );
};

Menu.propTypes = {
  menuHeight: PropTypes.any.isRequired,
};

export default Menu;
