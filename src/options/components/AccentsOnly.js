import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './AccentsOnly.styles';

const OPTION_ID = 'accentsOnly';

@withOptions
@withStyles(styles)
class AccentsOnly extends PureComponent {
  render() {
    const { options, Stylesheet } = this.props;
    return !options.enabled && options[OPTION_ID] ? <Stylesheet /> : null;
  }
}

export default AccentsOnly;
