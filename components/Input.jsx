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
  if (false) {
    onClickReset();
  }
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
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onClickInput: PropTypes.func,
  isValid: PropTypes.bool,
  focus: PropTypes.string,
  value: PropTypes.string.isRequired,
  acceptableText: PropTypes.string,
  unacceptableText: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  onClickInput: () => {},
  isValid: false,
  focus: '',
  acceptableText: '',
  unacceptableText: '',
};

export default Input;
