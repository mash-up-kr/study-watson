import styled from 'styled-components'

const StyledButton = styled.input`
  width: 100%;
  padding: 1rem 0;
  background-color: #0077FF;
  font-size: 1rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  border: none;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 0.8rem;
  color: #595959;
`;

const StyledInput = styled.input`
  border: 1px solid #EDEDED;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0 0.5rem 0;
  :focus {
    border: 1px solid #0077FF;
  }
`;

const StyledScreen = styled.div`
  width: calc(100% - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h1`
  width: 100%;
  font-size: 2rem;
  padding: 2rem 0;
`;

export { StyledButton, StyledLabel, StyledInput, StyledScreen, StyledTitle, StyledForm };