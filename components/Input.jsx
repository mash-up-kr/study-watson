import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledLabel, StyledInput } from '../common/StyledComponents';

const StyledInputContainer = styled.div`
  margin-bottom: 2rem;
`;

const StyledHelpText = styled.span`
  font-size: 0.8rem;
  color: #595959;
`;

const Input = ({
  label,
  id,
  type,
  placeholder,
  onChange,
  onClickReset,
  onClickInput,
  isValid,
  focus,
  value,
  acceptableText,
  unacceptableText,
}) => {
  return (
    <StyledInputContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={() => onClickInput(id)}
      />
      {focus === 'email' && (
        <StyledHelpText>
          {isValid ? acceptableText : unacceptableText}
        </StyledHelpText>
      )}
    </StyledInputContainer>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onClickInput: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  focus: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  acceptableText: PropTypes.string.isRequired,
  unacceptableText: PropTypes.string.isRequired,
};

export default Input;
