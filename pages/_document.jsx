import * as React from 'react';
import Document, { Main, NextScript } from 'next/document';
// import getConfig from 'next/config';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

import { GlobalStyle } from '../common/StyledComponents';

export default class CustomDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    const sheet = new ServerStyleSheet();
    const page = context.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...initialProps,
      ...page,
      styleTags,
      helmet: Helmet.renderStatic(),
    };
  }

  render() {
    // const { publicRuntimeConfig } = getConfig();
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html lang="ko" dir="ltr" {...htmlAttrs}>
        <head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
            rel="stylesheet"
          />
          <link href="/static/reset.css" rel="stylesheet" />
          <GlobalStyle />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-143821755-1"
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MPFSK4P');
            `,
            }}
          />
          {this.props.styleTags}
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <title>Study Watson</title>
          <meta
            name="description"
            content="효율적으로 스터디를 관리하는 가장 쉬운 방법 Study Watson"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://study-watson.herokuapp.com/"
          />
          <meta property="og:title" content="Study Watson" />
          <meta property="og:image" content="/static/meta-image.png" />
          <meta
            property="og:description"
            content="효율적으로 스터디를 관리하는 가장 쉬운 방법 Study Watson"
          />
          <meta property="og:site_name" content="Study Watson" />
          <meta property="og:locale" content="ko" />
          {/* <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" /> */}
          {/* <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@site_account" />
          <meta name="twitter:creator" content="@individual_account" />
          <meta name="twitter:url" content="https://example.com/page.html" />
          <meta name="twitter:title" content="Content Title" />
          <meta
            name="twitter:description"
            content="Content description less than 200 characters"
          />
          <meta name="twitter:image" content="https://example.com/image.jpg" /> */}
          {Object.values(helmet).map(el => el.toComponent())}
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="black" />
        </head>
        <body {...bodyAttrs}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5KMDZP4"
              style={{
                display: 'none',
                visibility: 'hidden',
                width: '0',
                height: '0',
              }}
            />
          </noscript>
          <Main />
          {process.env.NODE_ENV === 'production' && (
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
          )}
          <NextScript />
        </body>
      </html>
    );
  }
}
