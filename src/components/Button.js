import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import color from 'tinycolor2';

import { selectors } from 'modules/options';

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
  transition: background 500ms, opacity 500ms;

  ${props => props.accent && `background: ${props.accent.value}`};
  ${props => props.accent && `color: ${color(props.accent.value).getBrightness() > 165 ? '#141517' : '#fff'}`};

  &:hover {
    opacity: 1;
  }
`;

const Button = ({ accentColor, noAccent, children, ...rest }) => (
  <StyledButton accent={!noAccent && accentColor} {...rest}>
    {children}
  </StyledButton>
);

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state),
});

export default connect(mapStateToProps)(Button);
