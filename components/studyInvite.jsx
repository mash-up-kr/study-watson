import React, { useState, useEffect } from 'react';

import { Link } from '../routes';

const studyInvite = () => {
  const [link, setLink] = useState('https://....');
  const [isClicked, setIsClicked] = useState(false);

  const clickLink = e => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 800);
  };

  return (
    <div>
      <h3>링크를 공유해서 스터디원을 초대해보세요</h3>
      <h4>{link}</h4>
      <button onClick={clickLink} name="make" type="button">
        링크 복사
      </button>
      {isClicked && <h5>링크가 복사되었습니다!</h5>}
      <br />
      <Link route="/" href="/">
        메인으로 돌아가기
      </Link>
    </div>
  );
};

export default studyInvite;
