import React from 'react';

// import fb from '../firebase';
import Header from '../../components/Header';
import SignUpData from './SignUpData';

const Signup = () => {
  const user = { pk: null };
  return (
    <div>
      <Header user={user} />
      <SignUpData />
    </div>
  );
};

export default Signup;
