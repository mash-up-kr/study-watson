import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from '../routes';

const MainEmpty = () => {
  const { studies } = useSelector(state => state.study);
  // console.log(studies.length);
  // console.log(studies);
  return (
    <div>
      <div>
        {studies.length >= 1 ? studies : <h3>스터디를 만들고 관리해보세요!</h3>}

        <Link route="/addStudy" href="/addStudy">
          스터디 만들기
        </Link>
      </div>
    </div>
  );
};

export default MainEmpty;
