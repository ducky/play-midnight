import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import modal from 'modules/modal';
import options, { optionsSaga } from 'modules/options';
import toast from 'modules/toast';

export function* rootSaga() {
  yield all([optionsSaga()]);
}

export const rootReducer = combineReducers({
  modal,
  options,
  toast
});
