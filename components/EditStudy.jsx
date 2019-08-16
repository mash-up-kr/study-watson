import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useInput } from '../common/useInput';
import { UPDATE_STUDY_REQUEST } from '../reducers/study';

import {
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

  const dispatch = useDispatch();

  //   const { study } = useSelector(state => state.study);
  //   const a = useSelector(state => state.study.memberships.study);

  const { study } = useSelector(state => state.study.memberships);
  console.log('study', study);

  //
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

  const onSubmitForm = event => {
    event.preventDefault();

    dispatch({
      type: UPDATE_STUDY_REQUEST,
      data: {
        id: study.pk,
        category,
        name,
        description,
      },
    });
  };

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
