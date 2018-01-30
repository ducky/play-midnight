import React, { PureComponent } from 'react';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';
import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { isLight, FONT_LIGHT, FONT_DARK, DEFAULT_ACCENT, DEFAULT_BACKGROUND, TRANSITION_FAST } from 'style/theme';
import { actions } from 'modules/modal';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Grid from 'components/Grid';
import ModalWrapper from './ModalWrapper';

const PrettyTheme = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 125px;
  border-radius: 5px;
  background: ${props => props.background};
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  margin: 0 0 15px;
`;

const FancyInput = styled.input`
  width: 100%;
  text-align: center;
  background: transparent;
  outline: none;
  box-shadow: none;
  box-sizing: border-box;
  color: ${props => props.theme.font_primary};
  border: none;
  font-size: 20px;
  padding: 10px;
  font-weight: 700;
  margin: 0 0 10px;
  cursor: pointer;
  transition: background ${TRANSITION_FAST}, box-shadow ${TRANSITION_FAST};

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.B400};
    box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    color: ${props => props.theme.font_secondary};
  }
`;

const PickerWrapper = styled.div`
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  color: ${props => props.theme.black};
  margin: 0 0 20px;

  .chrome-picker {
    background: ${props => props.theme.B200} !important;
    color: ${props => props.theme.font_primary} !important;

    input {
      background: ${props => props.theme.B50} !important;
      border: 1px solid ${props => props.theme.B300} !important;
      color: ${props => props.theme.font_primary} !important;
      box-shadow: none !important;
    }

    svg {
      background: ${props => props.theme.B200} !important;
      transition: background ${TRANSITION_FAST};

      &:hover {
        background: ${props => props.theme.B100} !important;
      }

      path {
        fill: ${props => props.theme.font_primary} !important;
      }
    }

    span {
      color: ${props => props.theme.font_primary} !important;
    }
  }
`;

@withTheme
@connect(null, { close: actions.closeModal })
class ColorPickerModal extends PureComponent {
  constructor(props) {
    super(props);

    const details = props.details || {};
    this.state = {
      id: undefined,
      accent: DEFAULT_ACCENT,
      background: DEFAULT_BACKGROUND,
      name: '',
      ...details,
    };
  }

  onTitleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.name;
    this.setState(state => ({ [id]: value }));
  };

  onColorChange = type => color => {
    this.setState(state => ({
      [type]: color.hex,
    }));
  };

  closeModal = acceptValue => {
    const { id, accent, background, name } = this.state;
    const { id: modalId, onClose, close } = this.props;

    if (acceptValue) {
      onClose({ id, accent, background, name });
    }

    close(modalId);
  };

  render() {
    const { accent, background, name } = this.state;
    const { theme } = this.props;

    return (
      <ModalWrapper
        {...this.props}
        useCloseAction
        valid={name.length > 0}
        onClose={() => this.closeModal(true)}
        closeText="Save, It's Beautiful"
        cancelText="Cancel, Nevermind"
        width={475}
        locked
      >
        <FancyInput
          autoComplete="off"
          autoFocus
          maxLength="24"
          name="name"
          onChange={this.onTitleChange}
          placeholder="Click Here to Name Your Masterpiece"
          theme={theme}
          type="text"
          value={name}
        />
        <div>
          <h4 style={{ textAlign: 'center' }}>Theme Preview</h4>
          <PrettyTheme background={background}>
            <Checkbox style={{ marginBottom: 10 }} background={accent} />
            <Button style={{ marginBottom: 10 }} background={accent}>
              Such Button, Wow!
            </Button>
            <div style={{ color: isLight(background) ? FONT_LIGHT : FONT_DARK }}>Some Text!</div>
          </PrettyTheme>
        </div>
        <Grid span="3">
          <div>
            <h4 style={{ textAlign: 'center' }}>Background Color</h4>
            <PickerWrapper theme={theme}>
              <ChromePicker
                color={background}
                disableAlpha={true}
                onChangeComplete={this.onColorChange('background')}
              />
            </PickerWrapper>
          </div>
          <div>
            <h4 style={{ textAlign: 'center' }}>Accent Color</h4>
            <PickerWrapper theme={theme}>
              <ChromePicker color={accent} disableAlpha={true} onChangeComplete={this.onColorChange('accent')} />
            </PickerWrapper>
          </div>
        </Grid>
        <p>
          <small style={{ display: 'block', textAlign: 'center' }}>
            Play around until you find the perfect color. Your eyes will thank you.
          </small>
        </p>
      </ModalWrapper>
    );
  }
}

export default ColorPickerModal;
