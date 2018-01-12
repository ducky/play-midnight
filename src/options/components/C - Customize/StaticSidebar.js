import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './StaticSidebar.styles';

const OPTION_ID = 'staticSidebar';

@withOptions
@withStyles(styles)
class StaticSidebar extends PureComponent {
  render() {
    const { isActive, Stylesheet } = this.props;
    return isActive(OPTION_ID) ? <Stylesheet /> : null;
  }
}

export default StaticSidebar;
