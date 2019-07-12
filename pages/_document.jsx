import * as React from 'react';
import Document, { Main, NextScript } from 'next/document';
// import getConfig from 'next/config';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
     */

* {
  box-sizing: border-box;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 16px;
  font: inherit;
  vertical-align: baseline;
  color: #181818;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
}
`;

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
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
          <GlobalStyle />
        </head>
        <body {...bodyAttrs}>
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
