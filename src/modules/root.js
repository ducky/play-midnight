import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import options, { optionsSaga } from 'modules/options';

export function* rootSaga() {
  yield all([optionsSaga()]);
}

export const rootReducer = combineReducers({
  options
});
