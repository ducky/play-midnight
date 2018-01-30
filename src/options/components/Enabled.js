import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './Enabled.styles';

const OPTION_ID = 'enabled';

@withOptions
@withStyles(styles)
class Enabled extends PureComponent {
  render() {
    const { options, Stylesheet } = this.props;
    return options[OPTION_ID] ? <Stylesheet /> : null;
  }
}

export default Enabled;
