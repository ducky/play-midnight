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
    background: ${props => props.theme.B500};
    border: 1px solid ${props => props.theme.B500};
    border-radius: 25px;
    transition: background ${TRANSITION_FAST}, border-color ${TRANSITION_FAST}, opacity ${TRANSITION_FAST};

    ${props => props.background && `background: ${props.background}`};
    ${props => props.background && `border-color: ${props.background}`};
  }

  .Checkbox__knob {
    position: absolute;
    left: -2px;
    width: 20px;
    height: 20px;
    background: ${props => props.theme.B200};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
    transform: translateX(0);
    transition: transform ${TRANSITION_FAST}, background ${TRANSITION_FAST};

    ${props => props.background && `background: ${props.background}`};
  }

  input:checked + .Checkbox__container .Checkbox__track {
    ${props => `background: ${props.theme.A500}`};
    ${props => `border-color: ${props.theme.A600}`};
    opacity: 0.5;
  }

  input:checked + .Checkbox__container .Checkbox__knob {
    ${props => `background: ${props.theme.A500}`};
    ${props => `border-color: ${props.theme.A500}`};
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

const Checkbox = ({ background, style, theme, checked, disabled, defaultChecked, onChange, dispatch, ...rest }) => (
  <StyledCheckbox background={background} style={style} theme={theme}>
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
