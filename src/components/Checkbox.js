import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import noop from 'lodash/noop';

import { selectors } from 'modules/options';

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
    background: #1b1c1f;
    border: 1px solid #111;
    border-radius: 25px;
    transition: background 300ms, border-color 300ms, opacity 300ms;
  }

  .Checkbox__knob {
    position: absolute;
    left: -2px;
    width: 20px;
    height: 20px;
    background: #fafafa;
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
    transform: translateX(0);
    transition: transform 300ms, background 300ms;
  }

  input:checked + .Checkbox__container .Checkbox__track {
    ${props => props.accent && `background: ${props.accent.value}`};
    ${props => props.accent && `border-color: ${props.accent.value}`};
    /* TODO - Darken Border */
    opacity: 0.5;
  }

  input:checked + .Checkbox__container .Checkbox__knob {
    ${props => props.accent && `background: ${props.accent.value}`};
    ${props => props.accent && `border-color: ${props.accent.value}`};
    transform: translateX(100%);
  }

  input {
    display: none;
  }
`;

const Checkbox = ({
  accentColor,
  checked,
  disabled,
  defaultChecked,
  onChange,
  dispatch,
  ...rest
}) => (
  <StyledCheckbox accent={accentColor}>
    <label>
      <input
        type="checkbox"
        checked={checked}
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

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state)
});

export default connect(mapStateToProps)(Checkbox);
