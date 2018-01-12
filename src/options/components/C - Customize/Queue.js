import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './Queue.styles';

const OPTION_ID = 'queue';

@withOptions
@withStyles(styles)
class Queue extends PureComponent {
  render() {
    const { isActive, Stylesheet } = this.props;
    return isActive(OPTION_ID) ? <Stylesheet /> : null;
  }
}

export default Queue;
