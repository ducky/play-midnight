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
import { validateId, validateTitle } from 'utils/validation';

import OPTIONS, { SECTIONS } from 'options';
import NOTIFICATIONS from 'notifications';
import { actions as modalActions } from 'modules/modal';
import { actions as toastActions } from 'modules/toast';

// state
const defaultState = {
  data: [],
  menuVisible: false,
  optionsChanged: false,
};

// selectors
export const selectors = {
  allOptions: state => state.options.data,
  menuVisible: state => state.options.menuVisible,
  options: state => state.options.data.filter(o => !o.static),
  optionsChanged: state => state.options.optionsChanged,
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
  const theme = getArrayValue(options, 'theme', { accent: DEFAULT_ACCENT, background: DEFAULT_BACKGROUND }, false);
  return createTheme(theme.background, theme.accent);
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
export function* checkSaveSaga({ payload: toggleState }) {
  const optionsChanged = yield select(selectors.optionsChanged);
  const menuVisible = yield select(selectors.menuVisible);

  if (optionsChanged && !menuVisible) {
    yield put(
      toastActions.createToast('success', {
        title: 'Unsaved Options',
        message: `Just a friendly reminder that you closed the options without
        saving. Closing or refreshing the page without saving will result in losing
        any options you've changed.`,
        timeout: 4000,
      })
    );
  }
}

export function* checkUpdateSaga() {
  try {
    const version = yield select(selectors.version);
    const versionPrevious = yield select(selectors.versionPrevious);
    const notification = versionPrevious ? NOTIFICATIONS[version] : NOTIFICATIONS['default'];

    const showModal = function*(version, notification) {
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
    };

    if (!versionPrevious) {
      yield showModal(version, notification);
    } else if (semver.lt(versionPrevious, version)) {
      if (notification) {
        yield showModal(version, notification);
      } else {
        console.log(
          `No update notification found for v${version}.`,
          `Updating lastRun (${versionPrevious} -> ${version}).`
        );
        yield put(actions.updateSaveOption({ id: 'lastRun', value: version }));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

// Migrate Old Settings to Newer Version
export function* checkUpgradeSaga({ payload: options }) {
  const versionPrevious = yield select(selectors.versionPrevious);

  try {
    // Version < 3.0.0 - Convert accents to themes
    if (versionPrevious && semver.lt(versionPrevious, '3.0.0')) {
      const accents = options && options.accents ? options.accents : [];

      if (accents.length === 0) return;

      let currentValue = null;
      const newThemes = accents.map(item => {
        const id = validateId(item.id);

        if (item.id === options.accent) {
          currentValue = id;
        }

        return {
          id,
          accent: item.value,
          background: DEFAULT_BACKGROUND,
          name: validateTitle(item.name),
        };
      });

      const newValues = [...newThemes, ...options.themes];
      const newValue = currentValue ? currentValue : newValues[0].id;

      yield put(actions.updateOption({ id: 'themes', value: newValues, isArray: true }));
      yield put(actions.updateOption({ id: 'theme', value: newValue }));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* fetchOptionsSaga() {
  try {
    const DEFAULT_OPTIONS = toObject(OPTIONS);
    const allOptions = yield call(load);
    const optionsValues = { ...DEFAULT_OPTIONS, ...allOptions };
    const options = mapToValues(OPTIONS, optionsValues);
    yield put(actions.fetchOptionsResponse(options));
    yield put(actions.checkUpgrade(optionsValues));
    yield put(actions.checkUpdate());
  } catch (e) {
    console.error(e);
  }
}

export function* saveOptionsSaga() {
  try {
    const optionsSave = yield select(selectors.allOptions);
    yield call(save, toObject(optionsSave));
    yield put(actions.saveOptionsResponse(optionsSave));
    yield put(actions.toggleMenu(false));
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
    takeEvery(actions.toggleMenu, checkSaveSaga),
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
      return { ...state, data, optionsChanged: false };
    },
    [actions.updateOption](state, { payload: { id, value, isArray = false } }) {
      if (isArray) {
        return {
          ...state,
          data: updateItem(state.data, { plural: id, values: value }, 'plural'),
          optionsChanged: true,
        };
      }

      return { ...state, data: updateItem(state.data, { id, value }), optionsChanged: true };
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
