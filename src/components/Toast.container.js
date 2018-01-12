import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AlertToast from 'components/Toasts/AlertToast';
import InfoToast from 'components/Toasts/InfoToast';
import SuccessToast from 'components/Toasts/SuccessToast';

const types = {
  alert: <AlertToast />,
  info: <InfoToast />,
  success: <SuccessToast />,
};

const ToastContainer = styled.div`
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 119;
`;

const ToastConductor = ({ toasts = [] }) => {
  const getToastComponent = type => types[type] || null;

  return (
    <ToastContainer>
      <ReactCSSTransitionGroup transitionName="toast" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {toasts.map(toast => {
          const Toast = getToastComponent(toast.type);

          return Toast
            ? React.cloneElement(Toast, {
                key: toast.id,
                id: toast.id,
                ...toast.options,
              })
            : null;
        })}
      </ReactCSSTransitionGroup>
    </ToastContainer>
  );
};

const stateToProps = state => state.toast;

export default connect(stateToProps)(ToastConductor);
