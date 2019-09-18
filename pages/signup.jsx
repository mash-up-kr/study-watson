import React from 'react';

// import fb from '../firebase';
import Header from '../containers/Header';
import SignUpData from '../components/SignUpData';

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
