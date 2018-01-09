import React from 'react';

import ToastWrapper from './ToastWrapper';

const AlertToast = ({ ...props }) => {
  return (
    <ToastWrapper {...props} title={props.title || 'Alert'} type="alert">
      {props.message || 'This is an alert.'}
    </ToastWrapper>
  );
};

export default AlertToast;
