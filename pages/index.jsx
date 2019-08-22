import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Axios from 'axios';

import Header from '../containers/Header';
import Main from '../components/Main';
import { LOAD_STUDIES_REQUEST } from '../reducers/study';

const StyledIndex = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Index = ({ user }) => {
  return (
    <StyledIndex>
      <Header />
      <Main user={user} />
    </StyledIndex>
  );
};
Index.getInitialProps = async ({ ctx, token, pk }) => {
  if (token && pk) {
    try {
      const result = await Axios.get(
        'https://study-watson.lhy.kr/api/v1/members/profile/',
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      ctx.store.dispatch({
        type: LOAD_STUDIES_REQUEST,
        token,
        pk,
      });
      if (result.data) {
        return {
          user: result.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    user: {},
  };
};
Index.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Index;
