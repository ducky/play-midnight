import React from 'react';

import ToastWrapper from './ToastWrapper';

const InfoToast = ({ ...props }) => {
  return (
    <ToastWrapper {...props} title={props.title || 'Info'} type="info">
      {props.message || 'This is an informative toast.'}
    </ToastWrapper>
  );
};

export default InfoToast;
