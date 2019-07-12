import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import uuidv4 from 'uuid/v4';

import StudyInvite from './StudyInvite';
import ShowStudy from '../components/ShowStudy';
import MakeStudy from '../components/MakeStudy';
import { useInput } from '../common/useInput';
import { ADD_STUDY } from '../reducers/study';

const CreateStudy = () => {
  const id = uuidv4();
  const [depth, setDepth] = useState(0);
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');

  const dispatch = useDispatch();

  const addStudy = to => {
    dispatch({
      type: ADD_STUDY,
      payload: { id, title, description },
    });
    setDepth(to);
  };

  const onSubmitForm = (e, to) => {
    e.preventDefault();
    addStudy(to);
  };

  const components = [
    <MakeStudy
      onSubmitForm={onSubmitForm}
      title={title}
      setTitle={setTitle}
      setDescription={setDescription}
      description={description}
    />,
    <ShowStudy title={title} description={description} setDepth={setDepth} />,
    <StudyInvite link={id} />,
  ];

  return (
    // MakeStudy - ShowStudy - StudyInvite
    <div>{components[depth]}</div>
  );
};

export default CreateStudy;
