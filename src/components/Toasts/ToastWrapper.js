import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isNaN from 'lodash/isNaN';
import noop from 'lodash/noop';

import { actions } from 'modules/toast';
import { colors } from 'style/theme';

const DEFAULT_TIMEOUT = 4000;

const Toast = styled.div`
  position: relative;
  width: 300px;
  border-radius: 5px;
  background: ${colors.background_menu};
  color: ${colors.font_primary};
  padding: 20px 20px 35px;
  margin: 0 0 15px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  ${props => props.type === 'info' && `border-top: 10px solid ${colors.blue}`};
  ${props => props.type === 'success' && `border-top: 10px solid ${colors.green}`};
  ${props => props.type === 'alert' && `border-top: 10px solid ${colors.red}`};

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: 'click to close';
    text-align: center;
    padding: 8px;
    font-size: 10px;
    font-style: italic;
    color: rgba(255, 255, 255, 0.3);
  }

  &:last-child {
    margin: 0;
  }

  &.toast-enter {
    transform: scale(0.8);
    opacity: 0.01;
  }

  &.toast-enter.toast-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: transform 0.5s, opacity 0.5s;
  }

  &.toast-leave {
    transform: scale(0.8);
    opacity: 1;
  }

  &.toast-leave.toast-leave-active {
    transform: scale(0);
    opacity: 0.01;
    transition: transform 0.3s, opacity 0.3s;
  }

  .Toast__header {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 15px;
  }

  .Toast__content {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }
`;

class ToastWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),

    // Methods
    close: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    type: 'info',
    timeout: DEFAULT_TIMEOUT,

    // Methods
    close: noop,
    onClose: noop,
  };

  startTimer = () => {
    const { onClose, timeout } = this.props;

    if (timeout !== false) {
      const parseTimeout = parseInt(timeout, 10);
      const computedTimeout = !isNaN(parseTimeout) ? parseTimeout : DEFAULT_TIMEOUT;
      this.timer = setTimeout(this.withClose(onClose), computedTimeout);
    }
  };

  stopTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  withClose = (action = noop) => () => {
    const { id, close } = this.props;

    action();
    close(id);
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const { children, title, type, onClose } = this.props;

    return (
      <Toast type={type} onClick={this.withClose(onClose)} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
        <div className="Toast__header">Play Midnight - {title}</div>
        <div className="Toast__content">{children}</div>
      </Toast>
    );
  }
}

export default connect(null, { close: actions.closeToast })(ToastWrapper);
