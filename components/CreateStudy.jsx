import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import uuidv4 from 'uuid/v4';

import Header from './Header';
import StudyInvite from './StudyInvite';
import { useInput } from '../common/useInput';
import { ADD_STUDY } from '../reducers/study';

const ShowStudy = ({ title, description, setDepth }) => {
  return (
    <div>
      <h3>작성하신 내용을 확인해주세요</h3>
      <h4>스터디 이름</h4>
      <h4>{title}</h4>
      <h4>설명</h4>
      <h4>{description}</h4>
      <button type="button" name="next" onClick={() => setDepth(2)}>
        만들기
      </button>
    </div>
  );
};

ShowStudy.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setDepth: PropTypes.func.isRequired,
};

const MakeStudy = ({
  onSubmitForm,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  return (
    <div>
      <h3>스터디 만들기</h3>
      <form onSubmit={e => onSubmitForm(e, 1)}>
        <label htmlFor="title">스터디 이름</label>
        <input type="text" id="title" value={title} onChange={setTitle} />
        <label htmlFor="description">스터디 설명</label>
        <input type="text" value={description} onChange={setDescription} />
        <input type="submit" value="다음" />
      </form>
    </div>
  );
};

MakeStudy.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
};

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
        <Header />
        <StudyInvite link={id} />
      </div>
    );
  }
  if (depth === 1) {
    return (
      <div>
        <Header />
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
      <Header />
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
