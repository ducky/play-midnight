import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './Enabled.styles';

const OPTION_ID = 'enabled';

@withOptions
@withStyles(styles)
class Enabled extends PureComponent {
  render() {
    const { isActive, Stylesheet } = this.props;
    return isActive(OPTION_ID) ? <Stylesheet /> : null;
  }
}

export default Enabled;
