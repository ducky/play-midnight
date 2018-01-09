import React from 'react';

import ToastWrapper from './ToastWrapper';

const SuccessToast = ({ ...props }) => {
  return (
    <ToastWrapper {...props} title={props.title || 'Success'} type="success">
      {props.message || 'This is a success.'}
    </ToastWrapper>
  );
};

export default SuccessToast;
