import styled, { createGlobalStyle } from 'styled-components';

const StyledButton = styled.input`
  width: 100%;
  padding: 1rem 0;
  background-color: #4B2BFF;
  font-size: 1rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  border: none;
  margin: 0;
  -webkit-border-radius: 0;
`;

const StyledActionButton = styled.input`
  font-size: 1rem;
  color: #fff;
  background-color: #4B2BFF;
  padding: 1rem 3rem;
  border: none;
  border-radius: 8px;
  box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.1);
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 0.8rem;
  color: #595959;
`;

const StyledInput = styled.input`
  border: 1px solid #ededed;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0 0.5rem 0;
  background-color: transparent;
  border-radius: 8px;
  color: #4D5256;
  :focus {
    outline: none;
    box-shadow: 0 0 0 1px #4B2BFF;
  }
`;

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h1`
  width: 100%;
  font-size: 1.5rem;
  padding: 1.5rem 0;
  color: #4D5256;
`;

const StyledImageText = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.3;
  font-size: 1.3rem;
  font-weight: bold;
  color: #4D5256;
  margin-bottom: 1rem;
`;

const StyledInputContainer = styled.div`
  margin-bottom: 2rem;
`;

export const GlobalStyle = createGlobalStyle`
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

body { 
  background-color: #F8FAFB;
  font-family: 'Lato', 'APPLE SD Gothic Neo', 'Noto Sans KR', 'Helvetica Neue', Helvetica, "NanumGothic", "맑은 고딕", "Malgun Gothic", arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

input, textarea {
  -webkit-appearance: none;
}
`;

const StyledProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: -0.5rem;
  box-sizing: content-box;
`;

const StyledProfileCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 0.7rem;
  line-height: 24px;
  box-sizing: content-box;
`;

export {
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledScreen,
  StyledTitle,
  StyledForm,
  StyledActionButton,
  StyledImageText,
  StyledInputContainer,
  StyledProfileImage,
  StyledProfileCount,
};
