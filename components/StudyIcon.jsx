import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIcon = styled.label`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHideRadio = styled.input`
  width: 40px;
  height: 40px;
  margin: 0;
  -webkit-appearance: none;
  box-shadow: none;
  display: none;
  &:checked + label {
    border: 2px solid #4b2bff;
  }
`;

const StyledRadioLabel = styled.label`
  position: relative;
  z-index: 10;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledIconImage = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StudyIcon = ({ icon, pk, setIcon }) => {
  return (
    <div key={icon.pk}>
      <StyledIcon>
        <StyledHideRadio
          id={icon.pk}
          type="radio"
          name="test"
          value="small"
          checked={pk === icon.pk}
          onChange={() => setIcon(icon)}
        />
        <StyledRadioLabel htmlFor={`${icon.pk}`} />
        <StyledIconImage src={icon.image} alt="img" />
      </StyledIcon>
    </div>
  );
};

StudyIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  pk: PropTypes.number.isRequired,
  setIcon: PropTypes.func.isRequired,
};

export default StudyIcon;
