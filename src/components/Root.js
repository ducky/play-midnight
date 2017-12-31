import React from 'react';
import { Provider } from 'react-redux';

import store from 'lib/store';

import PlayMidnight from 'components/PlayMidnight';

const Root = () => (
  <Provider store={store}>
    <PlayMidnight />
  </Provider>
);

export default Root;
