import { PureComponent } from 'react';
import { css } from 'styled-components';

import getInjectedElement from 'utils/getInjectedElement';
import getCssString from 'utils/getCssString';

const styles = css`
  body {
    background: #141517;
  }
`;

class Core extends PureComponent {
  static id = 'core';

  componentDidMount() {
    const { id } = this.props;
    const style = getInjectedElement('style', `play-midnight-${id}`);
    style.innerText = getCssString(styles);
  }

  componentWillUnmount() {
    const { id } = this.props;
    const style = getInjectedElement('style', `play-midnight-${id}`);
    style.remove();
  }

  render() {
    return null;
  }
}

export default Core;
