import { applyMiddleware, compose, createStore } from 'redux';
import axios from 'axios';
import { Container } from 'next/app';
import createSagaMiddleware from 'redux-saga';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import { getCookie, getCookieServer } from '../common/cookie';
import reducer from '../reducers';
import rootSaga from '../sagas';

const MyApp = ({ Component, store, pageProps }) => {
  useEffect(() => {
    console.log(99, process.env.NODE_ENV, 22, 'serviceWorker' in navigator);
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      console.log(88, process.env.NODE_ENV);
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
  const { res } = context.ctx;
  const isServer = !!context.ctx.req;
  if (isServer) {
    token = getCookieServer({ value: 'token', context });
    pk = getCookieServer({ value: 'pk', context });
  } else {
    token = getCookie('token');
    pk = getCookie('pk');
  }
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  let pageProps = {};
  if (context.Component.getInitialProps) {
    const { ctx } = context;
    pageProps = await context.Component.getInitialProps({ ctx, token, pk, res });
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
