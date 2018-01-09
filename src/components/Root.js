import React from 'react';
import { Provider } from 'react-redux';

import store from 'lib/store';

import PlayMidnight from 'components/PlayMidnight';
import ModalContainer from 'components/Modal.container';
import ToastContainer from 'components/Toast.container';

const Root = () => (
  <Provider store={store}>
    <div>
      <PlayMidnight />
      <ModalContainer />
      <ToastContainer />
    </div>
  </Provider>
);

export default Root;
