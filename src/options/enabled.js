import { PureComponent } from 'react';
import { css } from 'styled-components';

import getInjectedElement from '../utils/getInjectedElement';
import getCssString from '../utils/getCssString';

const option = {
  key: 'enabled',
  type: 'boolean',
  title: 'Enable Play Midnight',
  description: `This will temporarily disable/enable Play Midnight if you don't want it on all the time`,
  defaultValue: true
};

const styles = css`
  body {
    color: #f00;
  }
`;

class Enabled extends PureComponent {
  componentDidMount() {
    const style = getInjectedElement('style', `play-midnight-${option.key}`);
    style.innerText = getCssString(styles);
  }

  componentWillUnmount() {
    const style = getInjectedElement('style', `play-midnight-${option.key}`);
    style.remove();
  }

  render() {
    return null;
  }
}

module.exports = {
  ...option,
  Component: Enabled
};
