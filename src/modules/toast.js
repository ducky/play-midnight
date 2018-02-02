import { createActions, handleActions } from 'redux-actions';
import uuid from 'uuid/v4';

import { replaceItem, removeItem } from 'utils/array';

export const TOAST_STANDARD = 'PLAY_MIDNIGHT_TOAST';

// State
const defaultState = {
  toasts: [],
};

// Selectors
export const selectors = {
  toasts: state => state.toast.toasts,
};

// Actions
export const actions = createActions(
  {
    CREATE_TOAST: (type, { id, ...options }) => ({
      id,
      type,
      options,
    }),
  },
  'CLOSE_TOAST'
);

// Helpers
const updateOrCreateToast = (toasts, toast) => {
  const id = toast.id ? toast.id : uuid();
  return replaceItem(toasts, { ...toast, id });
};

// Reducer
export default handleActions(
  {
    [actions.createToast](state, { payload: toast }) {
      return {
        ...state,
        toasts: updateOrCreateToast(state.toasts, toast),
      };
    },
    [actions.closeToast](state, { payload: id }) {
      return { ...state, toasts: removeItem(state.toasts, { id }) };
    },
  },
  defaultState
);
