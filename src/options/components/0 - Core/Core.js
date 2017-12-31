import { PureComponent } from 'react';
import { css } from 'styled-components';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'core';

const styles = css`
  body {
    background: #141517;
  }
`;

@withStyles(OPTION_ID, styles)
class Core extends PureComponent {
  render() {
    return null;
  }
}

export default Core;
