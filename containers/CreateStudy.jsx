import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Axios from 'axios';

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

const CreateStudy = () => {
  const [category, setCategory] = useInput('3');
  const [page, setPage] = useState(firstPage);
  const [name, setName] = useInput('');
  const [description, setDescription] = useInput('');
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const addStudy = () => {
    dispatch({
      type: ADD_STUDY_REQUEST,
      data: { name, description, category, icon },
    });
  };

  const clickLink = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (name.length > 1 && description.length > 1) {
      setPage(secondPage);
    } else {
      clickLink();
    }
  };

  const getIcon = async () => {
    const result = await Axios.get(
      'https://study-watson.lhy.kr/api/v1/study/icons/',
    );
    setIcons(result.data);
    setIcon(result.data[0]);
  };
  useEffect(() => {
    getIcon();
  }, []);

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

export default CreateStudy;
