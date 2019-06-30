import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import uuidv4 from 'uuid/v4';

import StudyInvite from "./StudyInvite";
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

  if (depth === 2) {
    return (
      <div>
        <StudyInvite link={id} />
      </div>
    );
  }
  if (depth === 1) {
    return (
      <div>
        <ShowStudy
          title={title}
          description={description}
          setDepth={setDepth}
        />
      </div>
    );
  }
  return (
    // MakeStudy - ShowStudy - StudyInvite
    <div>
      <MakeStudy
        onSubmitForm={onSubmitForm}
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
        description={description}
      />
    </div>
  );
};

export default CreateStudy;
