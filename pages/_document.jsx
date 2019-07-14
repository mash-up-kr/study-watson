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
      <html lang="ko" {...htmlAttrs}>
        <head>
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
          {Object.values(helmet).map(el => el.toComponent())}
          <GlobalStyle />
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
