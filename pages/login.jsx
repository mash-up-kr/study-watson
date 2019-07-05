import React from 'react';
import { useDispatch } from 'react-redux';

import Header from '../containers/Header';
import { LOG_IN_REQUEST } from '../reducers/user';
import { useInput } from '../common/useInput';

const Login = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <label htmlFor="email">email</label>
      <input type="email" id="email" value={email} onChange={setEmail} />
      <br />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={setPassword}
      />
      <br />
      <div onClick={onClick}>로그인</div>
    </div>
  );
};

export default Login;
