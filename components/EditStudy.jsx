import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { useInput } from '../common/useInput';
import { UPDATE_STUDY_REQUEST } from '../reducers/study';
import {
  StyledInputContainer,
  StyledButton,
  StyledLabel,
  StyledInput,
  StyledTitle,
  StyledForm,
} from '../common/StyledComponents';

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditStudy = () => {
  const [name, setName] = useInput('');
  const [category, setCategory] = useInput('3');
  const [description, setDescription] = useInput('');
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState({});
  const dispatch = useDispatch();

  const { study } = useSelector(state => state.study.memberships);
  // console.log('study', study);

  useEffect(() => {
    const n = {
      target: {
        value: study.name,
      },
    };
    setName(n);

    const d = {
      target: {
        value: study.description,
      },
    };
    setDescription(d);

    const cat = {
      target: {
        value: study.category.pk,
      },
    };
    setCategory(cat);
  }, [study]);

  useEffect(() => {
    setIcon(icon);
  }, [icon]);

  const onSubmitForm = event => {
    event.preventDefault();

    dispatch({
      type: UPDATE_STUDY_REQUEST,
      data: {
        id: study.pk,
        category,
        name,
        description,
        icon: icon.pk,
      },
    });
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

  return (
    <StyledScreen>
      <StyledTitle>스터디 수정하기</StyledTitle>
      <StyledForm onSubmit={e => onSubmitForm(e, 1)}>
        <StyledLabel htmlFor="name">스터디 이름</StyledLabel>
        <StyledInput type="text" id="name" value={name} onChange={setName} />
        <StyledLabel htmlFor="description">스터디 설명</StyledLabel>
        <StyledInput
          type="text"
          value={description}
          onChange={setDescription}
        />
        <StyledLabel htmlFor="category">카테고리</StyledLabel>
        <select id="category" onChange={setCategory} value={category}>
          <option value="3">Develop</option>
          <option value="4">Design</option>
        </select>
        <StyledInputContainer>
          <StyledLabel htmlFor="icon">대표 아이콘</StyledLabel>
          {icons.map(i => {
            return (
              <div key={i.pk}>
                <label>
                  <input
                    type="radio"
                    name="test"
                    value="small"
                    checked={icon.pk === i.pk}
                    onChange={() => setIcon(i)}
                  />
                  <img src={i.image} alt="img" style={{ width: '50px' }} />
                </label>
              </div>
            );
          })}
        </StyledInputContainer>

        <StyledButton type="submit" value="저장" />
      </StyledForm>
    </StyledScreen>
  );
};

EditStudy.getInitialProps = ({ ctx, token }) => {
  const studyId = ctx.query.studyId || '0';
  return {
    studyId,
    token,
  };
};

EditStudy.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  ctx.store.dispatch({
    type: UPDATE_STUDY_REQUEST,
    data: {
      studyId,
      token,
    },
  });
};

export default EditStudy;
