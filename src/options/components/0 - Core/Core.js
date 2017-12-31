import { PureComponent } from 'react';
import { css } from 'styled-components';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'core';

const styles = css`
  body {
    background: #141517;
  }
`;

class Core extends PureComponent {
  render() {
    return null;
  }
}

export default withStyles(OPTION_ID, styles)(Core);
