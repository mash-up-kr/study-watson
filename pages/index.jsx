import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import Header from '../containers/Header';
import Main from '../components/Main';
import { LOAD_STUDIES_REQUEST } from '../reducers/study';

const StyledIndex = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Index = () => {
  return (
    <StyledIndex>
      <Header />
      <Main />
    </StyledIndex>
  );
};
Index.getInitialProps = ({ ctx, token, pk }) => {
  if (token && pk) {
    ctx.store.dispatch({
      type: LOAD_STUDIES_REQUEST,
      token,
      pk,
    });
  }
};

// Index.propTypes = {
//   token: PropTypes.string.isRequired,
// };

export default Index;
