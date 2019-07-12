import { Container } from 'next/app';
import * as React from 'react';
import PropTypes from 'prop-types';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';

import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import reducer from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
// import Layout from '../containers/Layout';
import rootSaga from '../sagas';
import { getCookie } from '../common/cookie';

const MyApp = ({ Component, store, pageProps }) => (
  <Container>
    <Provider store={store}>
      <Helmet
        title="study-watson"
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          {
            charset: 'UTF-8',
          },
          {
            name: 'viewport',
            content:
              'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          },
          {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          },
          {
            name: 'description',
            content: 'study-watson',
          },
          {
            property: 'og:type',
            content: 'website',
          },
        ]}
        link={[
          {
            rel: 'shortcut icon',
            href: '/static/logo2.svg',
          },
        ]}
      />
      <Component {...pageProps} />
    </Provider>
  </Container>
);

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    store => next => action => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(store, action);
      }

      next(action);
    },
  ];
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f,
        )
      : compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

MyApp.getInitialProps = async context => {
  let token = '';
  const isServer = !!context.ctx.req;
  if (isServer) {
    const decodedCookie = decodeURIComponent(context.ctx.req.headers.cookie);
    const value = 'token';
    const cookieList = decodedCookie.split(';');
    const name = `${value}=`;
    const cookie = cookieList
      .map(e => e.trim())
      .find(e => e.indexOf(name) === 0);
    token = cookie ? cookie.substring(name.length) : '';
  } else {
    token = getCookie('token');
  }
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  context.ctx.store.dispatch({
    type: LOAD_USER_REQUEST,
    key: token,
  });
  let pageProps = {};
  if (context.Component.getInitialProps) {
    const { ctx } = context;
    pageProps = await context.Component.getInitialProps({ ctx, token });
  }
  return { pageProps, isServer };
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  store: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default withRedux(configureStore)(withReduxSaga(MyApp));
