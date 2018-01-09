import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isNaN from 'lodash/isNaN';
import noop from 'lodash/noop';

import { actions } from 'modules/toast';

const DEFAULT_TIMEOUT = 3500;

/*${colors.white};*/
/* ${props =>
    props.type === 'info' && `border-top: 10px solid ${colors.grayHoki}`};
  ${props =>
    props.type === 'success' && `border-top: 10px solid ${colors.greenSushi}`};
  ${props =>
    props.type === 'alert' && `border-top: 10px solid ${colors.redPersian}`}; */

const Toast = styled.div`
  width: 300px;
  border-radius: 5px;
  background: #fff;
  padding: 20px;
  margin: 0 0 15px;
  transform-origin: top right;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

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
    display: flex;
    align-items: center;
    font-size: 16px;
    margin: 0 0 20px;
  }

  .Toast__header-title {
    flex: 1 1 auto;
    margin-right: 15px;
  }

  .Toast__header-action {
    cursor: pointer;
    font-size: 14px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }

  .Toast__content {
    font-size: 14px;
    line-height: 1.2;
  }
`;

class ToastWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    title: PropTypes.string,
    type: PropTypes.string,

    // Methods
    close: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    title: '',
    type: 'info',

    // Methods
    close: noop,
    onClose: noop
  };

  startTimer = () => {
    const { onClose, timeout } = this.props;

    if (timeout !== false) {
      const parseTimeout = parseInt(timeout, 10);
      const computedTimeout = !isNaN(parseTimeout)
        ? parseTimeout
        : DEFAULT_TIMEOUT;
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
      <Toast
        type={type}
        onMouseEnter={this.stopTimer}
        onMouseLeave={this.startTimer}
      >
        <div className="Toast__header">
          <div className="Toast__header-title">{title}</div>
          <div
            className="Toast__header-action"
            onClick={this.withClose(onClose)}
          >
            <i className="fa fa-times" />
          </div>
        </div>
        <div className="Toast__content">{children}</div>
      </Toast>
    );
  }
}

export default connect(null, { close: actions.closeToast })(ToastWrapper);
