import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

// Reducers/Sagas
import options, { optionsSaga } from 'modules/options';
import modal from 'modules/modal';
import toast from 'modules/toast';

// Root Saga
export function* rootSaga() {
  yield all([optionsSaga()]);
}

// Root Reducer
export const rootReducer = combineReducers({
  modal,
  options,
  toast,
});
