import { createActions, handleActions } from 'redux-actions';
import { all, put, select, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import find from 'lodash/find';
import semver from 'semver';

import AppInfo from '../../package.json';
import { load, save } from 'lib/api';
import store from 'lib/store';
import { createTheme, DEFAULT_BACKGROUND, DEFAULT_ACCENT } from 'style/theme';
import getArrayValue from 'utils/getArrayValue';
import { updateItem } from 'utils/array';

import OPTIONS, { SECTIONS } from 'options';
import NOTIFICATIONS from 'notifications';
import { actions as modalActions } from 'modules/modal';
import { actions as toastActions } from 'modules/toast';

// state
const defaultState = {
  data: [],
  menuVisible: false,
};

// selectors
export const selectors = {
  allOptions: state => state.options.data,
  options: state => state.options.data.filter(o => !o.static),
  version: () => AppInfo.version,
};

selectors.enabled = createSelector([selectors.options], options => {
  const enabledOption = find(options, { id: 'enabled' });
  return enabledOption ? enabledOption.value : false;
});

selectors.enabledAccents = createSelector([selectors.options], options => {
  const enabledOption = find(options, { id: 'accentsOnly' });
  return enabledOption ? enabledOption.value : false;
});

selectors.theme = createSelector([selectors.options], options => {
  const accent = getArrayValue(options, 'accent', DEFAULT_ACCENT);
  const background = getArrayValue(options, 'background', DEFAULT_BACKGROUND);
  return createTheme(background, accent);
});

selectors.versionPrevious = createSelector([selectors.allOptions], options => {
  const versionOption = find(options, { id: 'lastRun' });
  return versionOption ? versionOption.value : undefined;
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
  'CHECK_UPDATE',
  'CHECK_UPGRADE',
  'FETCH_OPTIONS',
  'FETCH_OPTIONS_RESPONSE',
  'SAVE_OPTIONS',
  'SAVE_OPTIONS_RESPONSE',
  'TOGGLE_MENU',
  'UPDATE_OPTION',
  'UPDATE_SAVE_OPTION'
);

const toObject = (options = []) =>
  options.reduce((obj, option) => {
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
export function* checkUpdateSaga({ payload }) {
  try {
    const version = yield select(selectors.version);
    const versionPrevious = yield select(selectors.versionPrevious);
    const notification = versionPrevious ? NOTIFICATIONS[version] : NOTIFICATIONS['default'];

    if (versionPrevious && semver.eq(versionPrevious, version)) {
      console.log(`Already up to date, enjoy your life!`);
    } else {
      if (notification) {
        yield delay(5000);
        yield put(
          modalActions.showModal('notification', {
            id: 'PM_NOTIFICATION',
            details: {
              version,
              notification,
            },
            onClose: () => {
              // TODO - Has to be a better way
              store.dispatch(actions.updateSaveOption({ id: 'lastRun', value: version }));
            },
          })
        );
      } else {
        console.log(
          `No update notification found for v${version}. Updating lastRun (${versionPrevious} -> ${version}).`
        );
        yield put(actions.updateSaveOption({ id: 'lastRun', value: version }));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function* checkUpgradeSaga() {
  const versionPrevious = yield select(selectors.versionPrevious);
  if (versionPrevious && semver.lt(versionPrevious, '3.0.0')) {
    // Update any breaking changes < v3.0.0 here
  }
}

export function* fetchOptionsSaga() {
  try {
    const DEFAULT_OPTIONS = toObject(OPTIONS);
    const optionsValues = yield call(load, DEFAULT_OPTIONS);
    const options = mapToValues(OPTIONS, optionsValues);
    yield put(actions.fetchOptionsResponse(options));
    yield put(actions.checkUpgrade());
    yield put(actions.checkUpdate(options));
  } catch (e) {
    console.error(e);
  }
}

export function* saveOptionsSaga() {
  try {
    const optionsSave = yield select(selectors.allOptions);
    yield call(save, toObject(optionsSave));
    yield put(actions.toggleMenu(false));
    yield put(actions.saveOptionsResponse(optionsSave));
    yield put(
      toastActions.createToast('success', {
        title: 'Options Saved',
        message: `They're resting safely in the Google Cloud now`,
      })
    );
  } catch (e) {
    console.error(e);
    yield put(
      toastActions.createToast('alert', {
        title: 'Options Failure',
        message: `There seems to be an issue saving your options. \
        Please try again or refresh the page. Please contact me if this persists!`,
        timeout: false,
      })
    );
  }
}

export function* updateAndSaveOptionSaga({ payload: option }) {
  try {
    yield put(actions.updateOption(option));
    const update = yield select(selectors.allOptions);
    yield call(save, toObject(update));
    yield put(actions.saveOptionsResponse(update));
  } catch (e) {
    console.error(e);
    yield put(
      toastActions.createToast('alert', {
        title: 'Options Failure',
        message: `There seems to be an issue saving your options. \
        Please try again or refresh the page. Please contact me if this persists!`,
        timeout: false,
      })
    );
  }
}

export function* optionsSaga() {
  yield all([
    takeEvery(actions.checkUpdate, checkUpdateSaga),
    takeEvery(actions.checkUpgrade, checkUpgradeSaga),
    takeEvery(actions.fetchOptions, fetchOptionsSaga),
    takeEvery(actions.saveOptions, saveOptionsSaga),
    takeEvery(actions.updateSaveOption, updateAndSaveOptionSaga),
  ]);
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
