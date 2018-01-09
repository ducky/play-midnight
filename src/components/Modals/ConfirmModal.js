import React from 'react';

import ModalWrapper from './ModalWrapper';

const ConfirmModal = ({ ...props }) => {
  return (
    <ModalWrapper {...props} title={props.title || 'Confirmation'} width={500}>
      {props.message}
    </ModalWrapper>
  );
};

export default ConfirmModal;
