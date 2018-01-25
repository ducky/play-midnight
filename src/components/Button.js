import React from 'react';
import styled from 'styled-components';
import color from 'tinycolor2';

import withTheme from 'hoc/withTheme';

import { TRANSITION_FAST } from 'style/theme';

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
  opacity: 0.9;
  border: none;
  outline: none;
  box-shadow: none;
  background: #ccc;
  color: #333;
  transition: background ${TRANSITION_FAST}, opacity ${TRANSITION_FAST};

  ${props => props.useAccent && `background: ${props.theme.accent}`};
  ${props => props.useAccent && `color: ${color(props.theme.accent).getBrightness() > 165 ? '#141517' : '#fff'}`};

  &:hover {
    opacity: 1;
  }
`;

const Button = ({ theme, noAccent, children, ...rest }) => (
  <StyledButton theme={theme} useAccent={!noAccent} {...rest}>
    {children}
  </StyledButton>
);

export default withTheme(Button);
