import { PureComponent } from 'react';
import { css } from 'styled-components';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'favicon';

const styles = css`
  body {
    padding: 50px;
  }
`;

class Favicon extends PureComponent {
  render() {
    return null;
  }
}

export default withStyles(OPTION_ID, styles)(Favicon);
