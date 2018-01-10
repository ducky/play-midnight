import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';
import 'style/global';

import Root from 'components/Root';
import injectElement from 'utils/injectElement';

const entry = injectElement('div', {
  id: 'play-midnight',
});

ReactDOM.render(<Root />, entry);
