import { createActions, handleActions } from 'redux-actions';
import { all, put, select, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import find from 'lodash/find';
import semver from 'semver';

// Lib
import { load, save } from 'lib/api';
import store from 'lib/store';

// Styling
import { createTheme, DEFAULT_BACKGROUND, DEFAULT_ACCENT } from 'style/theme';

// Utils
import { validateId, validateTitle } from 'utils/validation';

// Redux/Options Related
import AppInfo from '../../package.json';
import OPTIONS, { SECTIONS } from 'options';
import NOTIFICATIONS from 'notifications';
import { actions as modalActions } from 'modules/modal';
import { actions as toastActions, TOAST_STANDARD } from 'modules/toast';

// State
const defaultState = {
  alternateAccent: null,
  data: {},
  dataCache: {},
  menuVisible: false,
};

// Selectors
export const selectors = {
  alternateAccent: state => state.options.alternateAccent,
  menuVisible: state => state.options.menuVisible,
  options: state => OPTIONS.filter(o => !o.static),
  optionsAll: state => OPTIONS,
  optionsValues: state => state.options.data,
  optionsChanged: state => !isEqual(state.options.data, state.options.dataCache),
  version: () => AppInfo.version,
};

selectors.theme = createSelector([selectors.optionsValues, selectors.alternateAccent], (options, alternateAccent) => {
  const foundTheme = find(options.themes, { id: options.theme });
  const theme = foundTheme ? foundTheme : { accent: DEFAULT_ACCENT, background: DEFAULT_BACKGROUND };

  if (options.albumAccents && alternateAccent) {
    return createTheme(options.enabled, theme.background, alternateAccent);
  }

  return createTheme(options.enabled, theme.background, theme.accent);
});

selectors.versionPrevious = createSelector([selectors.optionsValues], options => {
  return options ? options.lastRun : undefined;
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

// Actions
export const actions = createActions(
  'CHECK_UPDATE',
  'CHECK_UPGRADE',
  'FETCH_OPTIONS',
  'FETCH_OPTIONS_RESPONSE',
  'SAVE_OPTIONS',
  'SAVE_OPTIONS_RESPONSE',
  'TOGGLE_MENU',
  'UPDATE_ALTERNATE_ACCENT',
  'UPDATE_OPTION',
  'UPDATE_SAVE_OPTION'
);

// Helpers
const toObject = (options = []) =>
  options.reduce((obj, option) => {
    if (option.type === 'string') return obj;

    return !option.plural
      ? {
          ...obj,
          [option.id]: option.defaultValue,
        }
      : {
          ...obj,
          [option.id]: option.defaultValue,
          [option.plural]: option.defaultValues,
        };
  }, {});

// Sagas

// Migrate Old Settings to Newer Version
export function* checkUpgradeSaga({ payload: options }) {
  const versionPrevious = yield select(selectors.versionPrevious);

  try {
    // Version < 3.0.0 - Convert accents to themes
    if (versionPrevious && semver.lt(versionPrevious, '3.0.0')) {
      const accents = options && options.accents ? options.accents : [];

      if (accents.length === 0) return;

      let currentValue = null;
      const newThemes = accents.map(accent => {
        const id = validateId(accent.id);

        // Keep Old Selection if Found
        if (accent.selected === undefined) {
          currentValue = id;
        }

        return {
          id,
          accent: accent.color,
          background: DEFAULT_BACKGROUND,
          name: validateTitle(accent.name),
        };
      });

      const newValues = [...newThemes, ...options.themes];
      const newValue = currentValue ? currentValue : 'play-music';

      yield put(actions.updateOption({ id: 'themes', value: newValues }));
      yield put(actions.updateOption({ id: 'theme', value: newValue }));
    }
  } catch (e) {
    console.error(e);
  }
}

// Check for Update Modal
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

// Fetching/Saving
export function* fetchOptionsSaga() {
  try {
    const DEFAULT_OPTIONS = toObject(OPTIONS);
    const allOptions = yield call(load);
    const options = { ...DEFAULT_OPTIONS, ...allOptions };
    yield put(actions.fetchOptionsResponse(options));
    yield put(actions.checkUpgrade(options));
    yield put(actions.checkUpdate());
  } catch (e) {
    console.error(e);
  }
}

export function* saveOptionsSaga({ payload: optionsSave }) {
  try {
    yield call(save, optionsSave);
    yield put(actions.saveOptionsResponse(optionsSave));
    yield put(actions.toggleMenu(false));
    yield put(
      toastActions.createToast('success', {
        id: TOAST_STANDARD,
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
    const update = yield select(selectors.optionsValues);
    yield call(save, update);
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

// Warn User if Changed Options and Closed Menu
export function* checkSaveSaga({ payload: toggleState }) {
  const optionsChanged = yield select(selectors.optionsChanged);
  const menuVisible = yield select(selectors.menuVisible);

  if (optionsChanged && !menuVisible) {
    yield put(
      toastActions.createToast('success', {
        id: TOAST_STANDARD,
        title: 'Unsaved Options',
        message: `Just a friendly reminder that you closed the options without
        saving. Be sure to save your changes or you'll lose anything you've 
        changed the next time you refresh/close the page.`,
        timeout: 7500,
      })
    );
  }
}

// Root Saga
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

// Reducer
export default handleActions(
  {
    // Options Related
    [actions.fetchOptionsResponse](state, { payload: data }) {
      return {
        ...state,
        data,
        dataCache: data,
      };
    },
    [actions.saveOptionsResponse](state, { payload: data }) {
      return {
        ...state,
        data,
        dataCache: data,
      };
    },
    [actions.updateOption](state, { payload: { id, value } }) {
      return {
        ...state,
        data: {
          ...state.data,
          [id]: value,
        },
      };
    },

    // Accent
    [actions.updateAlternateAccent](state, { payload: alternateAccent }) {
      return { ...state, alternateAccent };
    },

    // Menu
    [actions.toggleMenu](state, { payload: toggleState }) {
      return {
        ...state,
        menuVisible: toggleState !== undefined ? toggleState : !state.menuVisible,
      };
    },
  },
  defaultState
);
