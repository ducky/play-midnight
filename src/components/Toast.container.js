import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { stripTransition, TRANSITION_FAST, TRANSITION_MEDIUM } from 'style/theme';
import AlertToast from 'components/Toasts/AlertToast';
import SuccessToast from 'components/Toasts/SuccessToast';

const types = {
  alert: <AlertToast />,
  success: <SuccessToast />,
};

const ToastContainer = styled.div`
  position: fixed;
  top: 79px;
  right: 15px;
  z-index: 119;
`;

const ToastConductor = ({ toasts = [] }) => {
  const getToastComponent = type => types[type] || null;

  return (
    <ToastContainer>
      <ReactCSSTransitionGroup
        transitionName="toast"
        transitionEnterTimeout={stripTransition(TRANSITION_MEDIUM)}
        transitionLeaveTimeout={stripTransition(TRANSITION_FAST)}
      >
        {toasts.map(toast => {
          const Toast = getToastComponent(toast.type);

          return Toast
            ? React.cloneElement(Toast, {
                key: toast.id,
                id: toast.id,
                transitionEnter: TRANSITION_MEDIUM,
                transitionLeave: TRANSITION_FAST,
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
