import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Link } from '../routes';

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainLogOut = () => {
  return <div>메인 페이지 입니다.</div>;
};

const MainLogIn = () => {
  const { studies } = useSelector(state => state.study);
  const ll = studies.length;
  return (
    <div>
      <div>
        {studies.length >= 1 ? (
          <>
            {studies.map(study => {
              return (
                <>
                  <li>{study.title}</li>
                  <li>{study.desc}</li>
                  <br />
                </>
              );
            })}
          </>
        ) : (
          <h3>스터디를 만들고 관리해보세요!</h3>
        )}

        <Link route="/addStudy" href="/addStudy">
          스터디 만들기
        </Link>
      </div>
    </div>
  );
};

const Main = () => {
  const { isLogin } = useSelector(state => state.user);

  return <StyledMain>{isLogin ? <MainLogIn /> : <MainLogOut />}</StyledMain>;
};

export default Main;
