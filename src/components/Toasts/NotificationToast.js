import React from 'react';

import ToastWrapper from './ToastWrapper';

const NotificationToast = ({ details, ...props }) => {
  const { DETAILS, Template } = details.notification;

  return (
    <ToastWrapper {...props} title={`Play Midnight - ${DETAILS.title}`} type="success">
      <Template />
    </ToastWrapper>
  );
};

export default NotificationToast;
