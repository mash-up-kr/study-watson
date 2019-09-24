<h1 align="center">Welcome to study-watson 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

### 🏠 [Homepage](https://study-watson.herokuapp.com/)
### 💻 [API](https://study-watson.lhy.kr/)

# MashUp React Project

## 효율적으로 스터디를 관리하는 가장 쉬운 방법을 제공하는 웹 서비스
- 웹 프론트엔드( React / Redux / Redux-saga / NEXT )
- 헤로쿠를 이용한 dev 서버 세팅
- 구글 Analytics 연결
- PWA 적용
- 안드로이드 웹뷰를 통한 안드로이드 배포
### 주요 기능
- 로그인 회원가입
- 스터디 관리
- 해시를 이용한 스터디 정보 제공 및 가입
- 일정 관리
- 참여 여부 투표
- 스터디 공지
- 출석 관리
- 멤버 관리
- 권한 관리
- 가장 가까운 스터디, 이전 스터디, 이후 스터디 구분
- 권한에 따른 다른 메뉴 보여주기

### 폴더 구조
- common : 공통 함수
- component : 재사용 컴포넌트
- config : 설정 파일
- file : 프로젝트 관련 파일
- pages : 페이지 컴포넌트
- reducers : 리듀서
- sagas : 리덕스 사가 함수, 비즈니스 로직
- static : 정적 파일

### Quick Start

- node : v8.15.0
- npm : 6.9.0

- 의존성 설치
```sh
git clone https://github.com/mash-up-kr/study-watson.git
cd study-watson
npm install
```

- 개발 서버 시작

```sh
  npm run dev
```

- 배포 서버 시작

```sh
  npm run build
  npm run start
```

- PM2 시작
```sh
  npm run build
  npm run depoly
```

### TEST

- 추가 필요

### 써드파티 패키지 

| 모듈 | 역할 | 사용한 부분 | 
|-|-|-|
|[axios](https://github.com/axios/axios)|HTTP 클라이언트|API 통신|
|[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)|번들링 파일을 Content-Encoding으로 압축|-|
|[cross-env](https://github.com/kentcdodds/cross-env)|플랫폼에 상관없이 단일 명령 사용|-|
|[dotenv](https://github.com/motdotla/dotenv)|환경변수 로드|-|
|[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)|불필요하거나 Prettier와 충돌 할 수있는 모든 규칙을 끔|-|
|[express](https://github.com/expressjs/express)|Node.js 웹 애플리케이션 프레임워크|-|
|[morgan](https://github.com/expressjs/morgan)|node.js 용 HTTP 요청 로거 미들웨어|-|
|[next](https://github.com/zeit/next.js/)|서버 사이드 렌더링 지원|-|
|[next-redux-saga](https://github.com/bmealhouse/next-redux-saga)|Next.js를 위한 redux-saga HOC|-|
|[next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)|Next.js 용 Redux 래퍼|-|
|[next-routes](https://github.com/fridays/next-routes)|Next.js의 동적 경로 지원|-|
|[prop-types](https://github.com/facebook/prop-types)|React props 및 유사한 객체에 대한 런타임 유형 확인|-|
|[react](https://github.com/facebook/react)|React는 사용자 인터페이스를 구축하기위한 JavaScript 라이브러리|-|
|[react-dom](https://github.com/facebook/react/blob/master/packages/react-dom/README.md)| React의 DOM 및 서버 렌더러에 대한 진입 점 역할|-|
|[react-helmet](https://github.com/nfl/react-helmet)|HEAD에 HTML 태그 수정|-|
|[react-redux](https://github.com/reduxjs/react-redux)|Redux의 공식 React 바인딩|-|
|[redux](https://github.com/reduxjs/redux)|Redux는 JavaScript 앱을위한 예측 가능한 상태 컨테이너|-|
|[redux-saga](https://github.com/redux-saga/redux-saga)|응용 프로그램 부작용(데이터 페치와 같은 비동기식 및 브라우저 캐시 액세스와 같은 불쾌한 것)을보다 쉽게 ​​관리하고,보다 효율적으로 실행하고, 테스트하기 쉽고, 오류 처리를 개선|비지니스 로직 구현|
|[styled-components](https://github.com/styled-components/styled-components)|구성 요소 연령에 대한 시각적 기본 요소. ES6 및 CSS를 사용하여 스트레스없이 앱의 스타일을 지정|-|
|[webpack](https://github.com/webpack/webpack)|자바 스크립트 및 친구를 위한번들러|-|

### devDependencies

| 모듈 | 역할 | 사용한 부분 | 
|-|-|-|
|[@babel/plugin-proposal-decorators](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-decorators)|클래스 및 객체 데코레이터를 ES5로 컴파일|-|
|[babel-eslint](https://github.com/babel/babel-eslint)|🗼ESLint에 사용되는 Babel 파서의 래퍼|-|
|[babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components)|디버깅 환경을 개선하고 스타일이 지정된 구성 요소에 서버 측 렌더링 지원 추가|-|
|[eslint](https://github.com/eslint/eslint)|JavaScript에서 패턴을 식별하고보고하기위한 완벽한 플러그 가능 도구|-|
|[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)|Airbnb의 .eslintrc를 확장 가능한 공유 구성으로 제공|-|
|[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)|올바른 가져 오기를 확인하는 데 도움이되는 규칙이 포함 된 ESLint 플러그인|-|
|[eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)|JSX 요소의 규칙에 대한 정적 AST 검사기|-|
|[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)|ESLint에 대한 특정 React 규칙에 대응|-|
|[eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)|ELint에서 후크 규칙을 시행|-|
|[nodemon](https://github.com/remy/nodemon)|ode.js 응용 프로그램의 변경 사항을 모니터링하고 서버를 자동으로 다시 시작|-|

## Author

👤 **Yuni-Q**

- Github: [@Yuni-Q](https://github.com/Yuni-Q)

👤 **Jusung Kim**

- Github: [@jus0k](https://github.com/jus0k)

👤 **snaag**

- Github: [@snaag](https://github.com/snaag)

👤 **LeeHanYeong**

- Github: [@LeeHanYeong](https://github.com/LeeHanYeong)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mash-up-kr/study-watson/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
