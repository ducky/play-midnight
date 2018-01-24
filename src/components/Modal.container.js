import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import AlertModal from 'components/Modals/AlertModal';
import ColorDeleteModal from 'components/Modals/ColorDeleteModal';
import ColorPickerModal from 'components/Modals/ColorPickerModal';
import ConfirmModal from 'components/Modals/ConfirmModal';
import NotificationModal from 'components/Modals/NotificationModal';

const types = {
  alert: <AlertModal />,
  confirm: <ConfirmModal />,
  colorDelete: <ColorDeleteModal />,
  colorPicker: <ColorPickerModal />,
  notification: <NotificationModal />,
};

const ModalConductor = ({ modals = [] }) => {
  const getModalComponent = type => types[type] || null;

  return (
    <Fragment>
      <ReactCSSTransitionGroup transitionName="modal" transitionEnterTimeout={300} transitionLeaveTimeout={200}>
        {modals.map(modal => {
          const Modal = getModalComponent(modal.type);

          return Modal
            ? React.cloneElement(Modal, {
                key: modal.id,
                id: modal.id,
                ...modal.options,
              })
            : null;
        })}
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const stateToProps = state => state.modal;

export default connect(stateToProps)(ModalConductor);
