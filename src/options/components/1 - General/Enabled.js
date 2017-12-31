import { PureComponent } from 'react';
import { css } from 'styled-components';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'enabled';

const styles = css`
  body {
    color: #f00;
  }
`;

class Enabled extends PureComponent {
  render() {
    return null;
  }
}

export default withStyles(OPTION_ID, styles)(Enabled);
