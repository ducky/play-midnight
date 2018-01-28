import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { stripTransition, TRANSITION_LIGHTNING, TRANSITION_FAST } from 'style/theme';

import AlertModal from 'components/Modals/AlertModal';
import ColorDeleteModal from 'components/Modals/ColorDeleteModal';
import ColorPickerModal from 'components/Modals/ColorPickerModal';
import ConfirmModal from 'components/Modals/ConfirmModal';
import NotificationModal from 'components/Modals/NotificationModal';
import ThemeDeleteModal from 'components/Modals/ThemeDeleteModal';
import ThemePickerModal from 'components/Modals/ThemePickerModal';

const types = {
  alert: <AlertModal />,
  confirm: <ConfirmModal />,
  colorDelete: <ColorDeleteModal />,
  colorPicker: <ColorPickerModal />,
  notification: <NotificationModal />,
  themeDelete: <ThemeDeleteModal />,
  themePicker: <ThemePickerModal />,
};

const ModalConductor = ({ modals = [] }) => {
  const getModalComponent = type => types[type] || null;

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        transitionName="modal"
        transitionEnterTimeout={stripTransition(TRANSITION_FAST)}
        transitionLeaveTimeout={stripTransition(TRANSITION_LIGHTNING)}
      >
        {modals.map(modal => {
          const Modal = getModalComponent(modal.type);

          return Modal
            ? React.cloneElement(Modal, {
                key: modal.id,
                id: modal.id,
                transitionEnter: TRANSITION_FAST,
                transitionLeave: TRANSITION_LIGHTNING,
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
