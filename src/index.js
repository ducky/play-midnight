import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';
import './theme/global';

import PlayMidnight from './components/PlayMidnight';
import getInjectedElement from './utils/getInjectedElement';

const entry = getInjectedElement('div', 'play-midnight');

ReactDOM.render(<PlayMidnight />, entry);
