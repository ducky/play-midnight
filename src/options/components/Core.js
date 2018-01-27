import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';
import withTheme from 'hoc/withTheme';

import observables from './Core.observables';
import styles from './Core.styles';

@withTheme
@withOptions
@withStyles(styles)
class Core extends Component {
  observe = () => {
    const { isActive, theme } = this.props;
    const enabled = isActive('enabled');
    observables.forEach(observable => observable(enabled, theme));
  };

  componentWillUnmount() {
    this.bodyObserver.disconnect();
  }

  componentDidMount() {
    this.bodyObserver = new MutationObserver(this.observe);
    this.bodyObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }

  shouldComponentUpdate({ theme: nextTheme }) {
    const { theme } = this.props;
    return !isEqual(nextTheme, theme);
  }

  render() {
    const { Stylesheet } = this.props;
    return <Stylesheet />;
  }
}

export default Core;
