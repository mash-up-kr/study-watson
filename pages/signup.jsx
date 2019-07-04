import React, { useState } from 'react';

// import fb from '../firebase';
import Header from '../containers/Header';
import SignUpData from '../components/SignUpData';
import SignupStart from '../components/SignupStart';

const Signup = () => {
  const [depth, setDepth] = useState(false);

  return (
    <div>
      <Header />
      {depth ? <SignUpData /> : <SignupStart setDepth={setDepth} />}
    </div>
  );
};

export default Signup;
