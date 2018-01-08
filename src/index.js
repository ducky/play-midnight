import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';
import 'theme/global';

import Root from 'components/Root';
import getInjectedElement from 'utils/getInjectedElement';

const init = async () => {
  const entry = await getInjectedElement('div', {
    id: 'play-midnight'
  });

  ReactDOM.render(<Root />, entry);
};

init();
