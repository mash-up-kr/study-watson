import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import StudyInvite from './studyInvite';
import { ADD_STUDY } from '../reducers/study';

const CreateStudy = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isNext, setIsNext] = useState(false);
  const [isShow, setisShow] = useState(false);

  const { studies } = useSelector(state => state.study);
  console.log(studies);
  const dispatch = useDispatch();

  const onSubmitForm = e => {
    e.preventDefault();
  };
  const onChangeInput = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'desc') {
      setDesc(e.target.value);
    }
  };

  const clickNext = () => {
    dispatch({
      type: ADD_STUDY,
      payload: { title, desc },
    });
    setIsNext(true);
  };

  const clickShow = () => {
    setisShow(true);
  };

  const MakeStudy = () => {
    return (
      <div>
        <h3>스터디 만들기</h3>
        <h4>스터디 이름</h4>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeInput}
          />

          <h4>스터디 설명</h4>
          <input
            type="text"
            name="desc"
            value={desc}
            onChange={onChangeInput}
          />

          <button type="button" name="next" onClick={clickShow}>
            다음
          </button>
        </form>
      </div>
    );
  };

  const ShowStudy = () => {
    return (
      <div>
        <h3>작성하신 내용을 확인해주세요</h3>
        <h4>스터디 이름</h4>
        <h4>{title}</h4>

        <h4>설명</h4>
        <h4>{desc}</h4>

        <button type="button" name="next" onClick={clickNext}>
          만들기
        </button>
      </div>
    );
  };

  // return <div>{isNext ? <StudyInvite /> : <MakeStudy />}</div>;
  return (
    // MakeStudy - ShowStudy - StudyInvite
    <div>
      {isNext ? <StudyInvite /> : isShow ? <ShowStudy /> : <MakeStudy />}
    </div>
  );
};

export default CreateStudy;
