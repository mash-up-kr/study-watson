import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import Header from '../../components/Header';
import Information from './Information';
import { userProfile } from '../../common/url';

const About = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Information />
    </>
  );
};

About.getInitialProps = async ({ token }) => {
  try {
    const result = await axios.get(userProfile, {
      headers: { Authorization: `Token ${token}` },
    });
    return {
      user: result.data,
    }
  } catch (error) {
    console.log(error)
    return {
      user: {
        pk: null,
      }
    }
  }
};

About.propType = {
  user: PropTypes.object.isRequired,
  aa: PropTypes.number.isRequired,
}

export default About;
