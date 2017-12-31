import { PureComponent } from 'react';
import { css } from 'styled-components';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'accentsOnly';

const styles = css`
  body {
    font-style: italic;
  }
`;

@withStyles(OPTION_ID, styles)
class AccentsOnly extends PureComponent {
  render() {
    return null;
  }
}

export default AccentsOnly;
