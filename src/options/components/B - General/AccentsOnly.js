import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './AccentsOnly.styles';

const OPTION_ID = 'accentsOnly';

@withOptions
@withStyles(styles)
class AccentsOnly extends PureComponent {
  render() {
    const { isActive, Stylesheet } = this.props;
    return isActive(OPTION_ID) ? <Stylesheet /> : null;
  }
}

export default AccentsOnly;
