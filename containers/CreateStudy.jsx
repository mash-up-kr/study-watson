import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import StudyInvite from './StudyInvite';
import ShowStudy from '../components/ShowStudy';
import MakeStudy from '../components/MakeStudy';
import { useInput } from '../common/useInput';
import { ADD_STUDY } from '../reducers/study';
import { canUseDOM } from '../common/canUesDOM';

const firstPage = 'firstPage';
const secondPage = 'secondPage';
const thirdPage = 'thirdPage';

const StyledToast = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #595959;
  color: #fff;
  position: fixed;
  bottom: 60px;
  font-size: 14px;
  text-align: center;
`;

const CreateStudy = () => {
  const [page, setPage] = useState(firstPage);
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const link = canUseDOM() && `${window.location.origin}/join/id`;

  const addStudy = () => {
    dispatch({
      type: ADD_STUDY,
      payload: { title, description },
    });
    setPage(secondPage);
  };

  const clickLink = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (title.length > 1 && description.length > 1) {
      addStudy();
    } else {
      clickLink();
    }
  };

  const moveThirdPage = () => {
    setPage(thirdPage);
  };

  const components = {
    [firstPage]: (
      <>
        <MakeStudy
          onSubmitForm={onSubmitForm}
          title={title}
          setTitle={setTitle}
          setDescription={setDescription}
          description={description}
        />
        {show && (
          <StyledToast>제목과 내용은 2자 이상 작성해주세요!</StyledToast>
        )}
      </>
    ),
    [secondPage]: (
      <ShowStudy
        title={title}
        description={description}
        moveThirdPage={moveThirdPage}
      />
    ),
    [thirdPage]: <StudyInvite link={link} />,
  };

  return (
    // MakeStudy - ShowStudy - StudyInvite
    <div>{components[page]}</div>
  );
};

export default CreateStudy;
