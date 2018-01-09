import { createActions, handleActions } from 'redux-actions';
import uuid from 'uuid/v4';

import { replaceItem, removeItem } from 'utils/array';

// default state
const defaultState = {
  toasts: [],
};

// actions
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

const updateOrCreateToast = (toasts, toast) => {
  const id = toast.id ? toast.id : uuid();
  return replaceItem(toasts, { ...toast, id });
};

// reducer
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
