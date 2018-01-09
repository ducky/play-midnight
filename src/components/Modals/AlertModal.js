import React from 'react';

import ModalWrapper from './ModalWrapper';

const AlertModal = ({ ...props }) => {
  return (
    <ModalWrapper
      {...props}
      cancelButton={false}
      title={props.title || 'Alert'}
      width={500}
    >
      {props.message}
    </ModalWrapper>
  );
};

export default AlertModal;
