import { createActions, handleActions } from 'redux-actions';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { load, save } from 'lib/api';
import { DEFAULT_ACCENT } from 'style/theme';
import { updateItem } from 'utils/array';

import OPTIONS, { SECTIONS } from 'options';

// state
const defaultState = {
  data: [],
  menuVisible: false,
};

// selectors
export const selectors = {
  options: state => state.options.data,
};

selectors.accentColor = createSelector([selectors.options], options => {
  const accentOption = find(options, { id: 'accent' });
  return accentOption ? find(accentOption.values, { id: accentOption.value }) : { value: DEFAULT_ACCENT };
});

selectors.enabled = createSelector([selectors.options], options => {
  const enabledOption = find(options, { id: 'enabled' });
  return enabledOption ? enabledOption.value : false;
});

selectors.visibleMenus = createSelector([selectors.options], options => {
  return filter(options, { section: 'visibleMenus' });
});

selectors.visiblePlaylists = createSelector([selectors.options], options => {
  return filter(options, { section: 'visiblePlaylists' });
});

selectors.sortedOptions = createSelector([selectors.options], options =>
  SECTIONS.map(section => {
    const sectionOptions = filter(options, o => {
      const oSection = o.section || 'default';
      return section.id === oSection;
    });

    return {
      ...section,
      options: sectionOptions || [],
    };
  })
);

// actions
export const actions = createActions(
  'FETCH_OPTIONS',
  'FETCH_OPTIONS_RESPONSE',
  'SAVE_OPTIONS',
  'SAVE_OPTIONS_RESPONSE',
  'TOGGLE_MENU',
  'UPDATE_OPTION'
);

const toObject = (options = []) =>
  options.reduce((obj, option) => {
    if (option.static) return obj;
    if (option.type === 'string') return obj;

    const updated = {
      ...obj,
      [option.id]: option.value !== undefined ? option.value : option.defaultValue,
    };

    return !option.plural
      ? updated
      : {
          ...updated,
          [option.plural]: option.values !== undefined ? option.values : option.defaultValues,
        };
  }, {});

const mapToValues = (options = [], values = {}) =>
  options.map(option => ({
    ...option,
    value: values[option.id],
    values: values[option.plural],
  }));

// sagas
export function* fetchOptionsSaga() {
  try {
    const DEFAULT_OPTIONS = toObject(OPTIONS);
    const optionsValues = yield call(load, DEFAULT_OPTIONS);
    const options = mapToValues(OPTIONS, optionsValues);
    yield put(actions.fetchOptionsResponse(options));
  } catch (e) {
    console.error(e);
  }
}

export function* saveOptionsSaga({ payload: optionsSave }) {
  try {
    yield call(save, toObject(optionsSave));
    yield put(actions.toggleMenu(false));
    yield put(actions.saveOptionsResponse(optionsSave));
  } catch (e) {
    console.error(e);
  }
}

export function* optionsSaga() {
  yield all([takeEvery(actions.fetchOptions, fetchOptionsSaga), takeEvery(actions.saveOptions, saveOptionsSaga)]);
}

// reducer
export default handleActions(
  {
    [actions.fetchOptionsResponse](state, { payload: data }) {
      return { ...state, data };
    },
    [actions.saveOptionsResponse](state, { payload: data }) {
      return { ...state, data };
    },
    [actions.updateOption](state, { payload: { id, value, isArray = false } }) {
      if (isArray) {
        return {
          ...state,
          data: updateItem(state.data, { plural: id, values: value }, 'plural'),
        };
      }

      return { ...state, data: updateItem(state.data, { id, value }) };
    },
    [actions.toggleMenu](state, { payload: toggleState }) {
      return {
        ...state,
        menuVisible: toggleState !== undefined ? toggleState : !state.menuVisible,
      };
    },
  },
  defaultState
);
