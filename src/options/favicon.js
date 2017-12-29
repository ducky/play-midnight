import { PureComponent } from 'react';
import { css } from 'styled-components';

import getInjectedElement from '../utils/getInjectedElement';
import getCssString from '../utils/getCssString';

const option = {
  key: 'favicon',
  type: 'boolean',
  title: 'Enable Favicon',
  description: `Show favicon as accent color`,
  defaultValue: true
};

const styles = css`
  body {
    padding: 50px;
  }
`;

class Favicon extends PureComponent {
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
  Component: Favicon
};
