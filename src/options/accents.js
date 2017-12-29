import { PureComponent } from 'react';
import { css } from 'styled-components';

import getInjectedElement from '../utils/getInjectedElement';
import getCssString from '../utils/getCssString';

const option = {
  key: 'accents',
  type: 'boolean',
  title: 'Enable Accents',
  description: 'Testing things',
  defaultValue: true
};

const styles = css`
  body {
    background: #141517;
  }
`;

class Accents extends PureComponent {
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
  Component: Accents
};
