import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import StudyInvite from './StudyInvite';
import ShowStudy from '../components/ShowStudy';
import MakeStudy from '../components/MakeStudy';
import { useInput } from '../common/useInput';
import { ADD_STUDY } from '../reducers/study';
import { canUseDOM } from '../common/canUesDOM';

const firstPage = 'firstPage';
const secondPage = 'secondPage';
const thirdPage = 'thirdPage';

const CreateStudy = () => {
  const [page, setPage] = useState(firstPage);
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');

  const dispatch = useDispatch();

  const link = canUseDOM() && `${window.location.origin}/join/id`;

  const addStudy = () => {
    dispatch({
      type: ADD_STUDY,
      payload: { title, description },
    });
    setPage(secondPage);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    addStudy();
  };

  const moveThirdPage = () => {
    setPage(thirdPage);
  };

  const components = {
    [firstPage]: (
      <MakeStudy
        onSubmitForm={onSubmitForm}
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
        description={description}
      />
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
