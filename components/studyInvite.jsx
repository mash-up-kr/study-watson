import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from '../routes';

const StudyInvite = ({ link }) => {
  const [show, setShow] = useState(false);

  const clickLink = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 800);
  };

  return (
    <div>
      <h3>링크를 공유해서 스터디원을 초대해보세요</h3>
      <h4>{link}</h4>
      <button onClick={clickLink} name="make" type="button">
        링크 복사
      </button>
      {show && <h5>링크가 복사되었습니다!</h5>}
      <br />
      <Link route="/" href="/">
        메인으로 돌아가기
      </Link>
    </div>
  );
};
StudyInvite.propTypes = {
  link: PropTypes.string.isRequired,
};

export default StudyInvite;
