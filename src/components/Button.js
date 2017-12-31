import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-radius: 3px;
  font-weight: 500;
  padding: 10px 15px;
  cursor: pointer;
  background: #981046;
  opacity: 0.9;
  border: none;
  outline: none;
  box-shadow: none;
  color: #fff;
  transform: opacity 500ms;

  &:hover {
    opacity: 1;
  }
`;

const Checkbox = ({ children, ...rest }) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export default Checkbox;
