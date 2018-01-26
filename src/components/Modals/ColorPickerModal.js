import React, { PureComponent } from 'react';
import { PhotoshopPicker } from 'react-color';
import { connect } from 'react-redux';
import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { DEFAULT_ACCENT } from 'style/theme';
import { actions } from 'modules/modal';

import ModalWrapper from './ModalWrapper';

const FancyInput = styled.input`
  width: 100%;
  text-align: center;
  background: transparent;
  outline: none;
  box-shadow: none;
  color: ${props => props.theme.font_primary};
  text-shadow: 0px 3px ${props => props.theme.B500};
  border: none;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 25px;
`;

const PickerWrapper = styled.div`
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  color: ${props => props.theme.black};
  margin: 0 0 10px;
`;

@withTheme
@connect(null, { close: actions.closeModal })
class ColorPickerModal extends PureComponent {
  constructor(props) {
    super(props);

    const details = props.details || {};
    this.state = {
      id: undefined,
      color: DEFAULT_ACCENT,
      name: '',
      ...details,
    };
  }

  onTitleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.name;
    this.setState(state => ({ [id]: value }));
  };

  onColorChange = color => {
    this.setState(state => ({
      color: color.hex,
    }));
  };

  closeModal = acceptValue => {
    const { id, color, name } = this.state;
    const { id: modalId, onClose, close } = this.props;

    if (acceptValue) {
      onClose({ id, color, name });
    }

    close(modalId);
  };

  render() {
    const { color, name } = this.state;
    const { theme } = this.props;

    return (
      <ModalWrapper {...this.props} closeButton={false} cancelButton={false} width={513}>
        <FancyInput
          name="name"
          placeholder="Click Here to Name Your Masterpiece"
          maxLength="24"
          onChange={this.onTitleChange}
          value={name}
          type="text"
          theme={theme}
          autoComplete="off"
          autoFocus
        />
        <PickerWrapper theme={theme}>
          <PhotoshopPicker
            header="Beautiful Color Decider"
            color={color}
            onChange={this.onColorChange}
            onAccept={() => this.closeModal(true)}
            onCancel={() => this.closeModal(false)}
          />
        </PickerWrapper>
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
