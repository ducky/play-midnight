import { createActions, handleActions } from 'redux-actions';
import uuid from 'uuid/v4';

import { replaceItem, removeItem } from 'utils/array';

// State
const defaultState = {
  modals: [],
};

// Actios
export const actions = createActions(
  {
    SHOW_MODAL: (type, options) => ({
      type,
      options,
    }),
  },
  'CLOSE_MODAL'
);

// Selectors
export const selectors = {
  modals: state => state.modal.modals,
};

// Helpers
const updateOrCreateModal = (modals, modal) => {
  const id = modal.id ? modal.id : uuid();
  return replaceItem(modals, { ...modal, id });
};

// Reducer
export default handleActions(
  {
    [actions.showModal](state, { payload: { type, options: { id, ...options } } }) {
      return {
        ...state,
        modals: updateOrCreateModal(state.modals, { id, type, options }),
      };
    },
    [actions.closeModal](state, { payload: id }) {
      return { ...state, modals: removeItem(state.modals, { id }) };
    },
  },
  defaultState
);
