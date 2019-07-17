import { Container } from 'next/app';
import React, { useEffect } from 'react';
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
import rootSaga from '../sagas';
import { getCookie, getCookieServer } from '../common/cookie';

const MyApp = ({ Component, store, pageProps }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(result => {
          console.log('service worker registration successful', result);
        })
        .catch(err => {
          console.log('service worker registration failed', err.message);
        });
    }
  }, []);
  return (
    <Container>
      <Provider store={store}>
        <Helmet
          title="study-watson"
          htmlAttributes={{ lang: 'ko' }}
          meta={[
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
              href: '/static/logo-32.png',
            },
          ]}
        />
        <Component {...pageProps} />
      </Provider>
    </Container>
  );
};

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
  let pk = '';
  const isServer = !!context.ctx.req;
  if (isServer) {
    token = getCookieServer({ value: 'token', context });
    pk = getCookieServer({ value: 'pk', context });
  } else {
    token = getCookie('token');
    pk = getCookie('pk');
  }
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  context.ctx.store.dispatch({
    type: LOAD_USER_REQUEST,
    key: token,
  });
  let pageProps = {};
  if (context.Component.getInitialProps) {
    const { ctx } = context;
    pageProps = await context.Component.getInitialProps({ ctx, token, pk });
  }
  return { pageProps, isServer };
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  store: PropTypes.any.isRequired,
  pageProps: PropTypes.any,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default withRedux(configureStore)(withReduxSaga(MyApp));
