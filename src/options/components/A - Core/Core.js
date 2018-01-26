import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';
import withTheme from 'hoc/withTheme';

import observables from './Core.observables';
import styles from './Core.styles';

@withTheme
@withOptions
@withStyles(styles)
class Core extends PureComponent {
  componentWillUnmount() {
    this.bodyObserver.disconnect();
  }

  componentDidMount() {
    const { isActive, theme } = this.props;

    this.bodyObserver = new MutationObserver(() => {
      observables.forEach(observable => observable(isActive('enabled'), theme));
    });

    this.bodyObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }

  render() {
    const { Stylesheet } = this.props;
    return <Stylesheet />;
  }
}

export default Core;
