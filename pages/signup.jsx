import React, { useState } from 'react';

// import fb from '../firebase';
import Header from '../containers/Header';
import SignUpEnd from '../components/SignUpEnd';
import SignUpData from '../components/SignUpData';
import SignupStart from '../components/SignupStart';

const Signup = () => {
  const [depth, setDepth] = useState(0);

  const changeDepth = to => {
    setDepth(to);
  };

  if (depth === 2) {
    return (
      <div>
        <Header />
        <SignUpEnd />
      </div>
    );
  }

  if (depth === 1) {
    return (
      <div>
        <Header />
        <SignUpData changeDepth={changeDepth} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <SignupStart changeDepth={changeDepth} />
    </div>
  );
};

export default Signup;
