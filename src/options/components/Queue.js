import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './Queue.styles';

const OPTION_ID = 'queue';

@withOptions
@withStyles(styles)
class Queue extends PureComponent {
  render() {
    const { options, Stylesheet } = this.props;
    return options[OPTION_ID] ? <Stylesheet /> : null;
  }
}

export default Queue;
