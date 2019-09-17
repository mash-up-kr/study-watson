import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../containers/Header';
import Main from '../components/Main';
import { login } from '../common/redirect'
import { deleteCookie } from '../common/cookie';

const StyledIndex = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Index = ({ user, studies }) => {
  return (
    <StyledIndex>
      <Header user={user} />
      <Main user={user} studies={studies} />
    </StyledIndex>
  );
};
Index.getInitialProps = async ({ token, pk, res }) => {
  if (!!token && !!pk) {
    try {
      const result = await Promise.all([
        axios.get(
          'https://study-watson.lhy.kr/api/v1/members/profile/',
          {
            headers: { Authorization: `Token ${token}` },
          },
        ),
        axios.get(
          `https://study-watson.lhy.kr/api/v1/study/memberships/?user=${pk}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          },
        ),
      ])
      const studies = result[1].data;
      const filterStudies =
        studies.length > 0 &&
        studies.filter(study => {
          return study.isWithdraw === false;
        });

      return {
        user: result[0].data,
        studies: filterStudies,
      };
    } catch (error) {
      console.log(error);
      deleteCookie('token');
      deleteCookie('pk');
      login({ res });
    }
  } else {
    return {
      user: {
        pk: null,
      },
      studies: [],
    }
  }
};
Index.propTypes = {
  user: PropTypes.object.isRequired,
  studies: PropTypes.array.isRequired,
};

export default Index;
