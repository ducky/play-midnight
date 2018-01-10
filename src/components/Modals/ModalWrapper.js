import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';

import { actions } from 'modules/modal';

import Button from 'components/Button';
import { propTypes, defaultProps } from './ModalWrapper.statics';
import StyledModal, { ModalActions, ModalBackdrop } from './ModalWrapper.styled';

class ModalWrapper extends PureComponent {
  static defaultProps = defaultProps;
  static propTypes = propTypes;

  // Wrap Action with close event
  withClose = (action, useReduxCloseAction = false) => () => {
    // TODO - add edited check
    const { id, close } = this.props;
    const modalAction = isFunction(action) ? action : noop;

    if (useReduxCloseAction) {
      modalAction();
    } else {
      modalAction();
      close(id);
    }
  };

  getCloseEvent = () => {
    const { cancelButton, onClose, onCancel, useCloseAction, useCancelAction } = this.props;
    return cancelButton ? this.withClose(onCancel, useCloseAction) : this.withClose(onClose, useCancelAction);
  };

  handleBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      const closeEvent = this.getCloseEvent();
      closeEvent();
    }
  };

  handleKeyPress = ({ keyCode }) => {
    if (keyCode === 27) {
      const closeEvent = this.getCloseEvent();
      closeEvent();
    }
  };

  getButtonType = (type = '') => ({
    alert: type === 'alert',
    info: type === 'info',
    success: type === 'success',
    noAccent: !['alert', 'info', 'success'].includes(type),
  });

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  render() {
    const {
      id,
      buttons,
      children,
      collapse,
      cancelText,
      closeText,
      cancelButton,
      closeButton,
      useCloseAction,
      useCancelAction,
      locked,
      title,
      type,
      width,
      valid,
      onCancel,
      onClose,
    } = this.props;

    const modalButtons = [];

    if (closeButton) {
      modalButtons.push({
        action: onClose,
        useReduxAction: useCloseAction,
        text: closeText,
        type: cancelButton ? type || 'info' : null,
        disabled: !valid,
      });
    }

    if (cancelButton) {
      modalButtons.push({
        action: onCancel,
        useReduxAction: useCancelAction,
        text: cancelText,
      });
    }

    const modalActions = [...buttons, ...modalButtons];

    return (
      <ModalBackdrop key={id} onClick={!locked ? this.handleBackgroundClick : noop}>
        <StyledModal style={{ width: width ? `${width}px` : '100%' }} type={type} collapse={collapse}>
          {title && <div className="Modal__header">{title}</div>}
          <div className="Modal__content">{children}</div>
          {modalActions.length > 0 && (
            <ModalActions length={modalActions.length}>
              {modalActions.map(({ action, type, text, useReduxAction, ...props }, i) => (
                <Button
                  className="Modal__action"
                  key={i}
                  onClick={this.withClose(action, useReduxAction)}
                  {...this.getButtonType(type)}
                  {...props}
                >
                  {text}
                </Button>
              ))}
            </ModalActions>
          )}
        </StyledModal>
      </ModalBackdrop>
    );
  }
}

export default connect(null, {
  close: actions.closeModal,
})(ModalWrapper);
