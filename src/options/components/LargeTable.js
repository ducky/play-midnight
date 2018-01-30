import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './LargeTable.styles';

const OPTION_ID = 'largeTable';

@withOptions
@withStyles(styles)
class LargeTable extends PureComponent {
  render() {
    const { options, Stylesheet } = this.props;
    return options[OPTION_ID] ? <Stylesheet /> : null;
  }
}

export default LargeTable;
