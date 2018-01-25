import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';

import withTheme from 'hoc/withTheme';
import { TRANSITION_FAST } from 'style/theme';

const StyledCheckbox = styled.div`
  display: inline-flex;

  .Checkbox__container {
    position: relative;
    width: 36px;
    height: 20px;
    cursor: pointer;
  }

  .Checkbox__track {
    position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    bottom: 3px;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.background};
    border-radius: 25px;
    transition: background ${TRANSITION_FAST}, border-color ${TRANSITION_FAST}, opacity ${TRANSITION_FAST};
  }

  .Checkbox__knob {
    position: absolute;
    left: -2px;
    width: 20px;
    height: 20px;
    background: ${props => props.theme.font_primary};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
    transform: translateX(0);
    transition: transform ${TRANSITION_FAST}, background ${TRANSITION_FAST};
  }

  input:checked + .Checkbox__container .Checkbox__track {
    ${props => `background: ${props.theme.accent}`};
    ${props => `border-color: ${props.theme.accent}`};
    /* TODO - Darken Border */
    opacity: 0.5;
  }

  input:checked + .Checkbox__container .Checkbox__knob {
    ${props => `background: ${props.theme.accent}`};
    ${props => `border-color: ${props.theme.accent}`};
    transform: translateX(100%);
  }

  input:disabled + .Checkbox__container .Checkbox__track {
    cursor: not-allowed;
  }

  input:disabled + .Checkbox__container .Checkbox__knob {
    cursor: not-allowed;
  }

  input {
    display: none;
  }
`;

const Checkbox = ({ theme, checked, disabled, defaultChecked, onChange, dispatch, ...rest }) => (
  <StyledCheckbox theme={theme}>
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={disabled ? noop : onChange}
        {...rest}
      />
      <div className="Checkbox__container">
        <div className="Checkbox__track" />
        <div className="Checkbox__knob" />
      </div>
    </label>
  </StyledCheckbox>
);

export default withTheme(Checkbox);
