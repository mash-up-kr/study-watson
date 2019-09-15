import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ShowStudy from '../components/ShowStudy';
import MakeStudy from '../components/MakeStudy';
import { useInput } from '../common/useInput';
import { ADD_STUDY_REQUEST } from '../reducers/study';

const firstPage = 'firstPage';
const secondPage = 'secondPage';

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

const CreateStudy = ({icons}) => {
  const [category, setCategory] = useInput('3');
  const [page, setPage] = useState(firstPage);
  const [name, setName] = useInput('');
  const [description, setDescription] = useInput('');
  const [icon, setIcon] = useState(icons[0]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const addStudy = useCallback(() => {
    dispatch({
      type: ADD_STUDY_REQUEST,
      data: { name, description, category, icon: icon.pk },
    });
  },[name, description, icon, category]);

  const clickLink = useCallback(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }, []);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    if (name.length > 1 && description.length > 1) {
      setPage(secondPage);
    } else {
      clickLink();
    }
  },[name, description]);

  const components = {
    [firstPage]: (
      <>
        <MakeStudy
          onSubmitForm={onSubmitForm}
          name={name}
          setName={setName}
          setDescription={setDescription}
          description={description}
          category={category}
          setCategory={setCategory}
          icon={icon}
          setIcon={setIcon}
          icons={icons}
        />
        {show && (
          <StyledToast>제목과 내용은 2자 이상 작성해주세요!</StyledToast>
        )}
      </>
    ),
    [secondPage]: (
      <ShowStudy
        name={name}
        category={category}
        description={description}
        icon={icon}
        addStudy={addStudy}
      />
    ),
  };

  return (
    // MakeStudy - ShowStudy
    <div>{components[page]}</div>
  );
};

CreateStudy.propTypes = {
  icons: PropTypes.array.isRequired,
}

export default CreateStudy;
