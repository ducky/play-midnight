import React from 'react';
import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { isLight, FONT_LIGHT, FONT_DARK, TRANSITION_FAST } from 'style/theme';

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
  background: ${props => props.theme.B25};
  color: ${props => props.theme.font_primary};
  transition: background ${TRANSITION_FAST}, opacity ${TRANSITION_FAST};

  ${props => props.useAccent && `background: ${props.theme.A500}`};
  ${props => props.useAccent && `color: ${isLight(props.theme.A500) ? FONT_LIGHT : FONT_DARK}`};

  ${props => props.accent && `background: ${props.accent}`};
  ${props => props.accent && `color: ${isLight(props.accent) ? FONT_LIGHT : FONT_DARK}`};

  &:not([disabled]):hover {
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = ({ accent, background, theme, noAccent, children, ...rest }) => (
  <StyledButton accent={accent} background={background} theme={theme} useAccent={!noAccent} {...rest}>
    {children}
  </StyledButton>
);

export default withTheme(Button);
