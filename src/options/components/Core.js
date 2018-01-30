import React, { Component } from 'react';

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
    const { options, theme } = this.props;
    observables.forEach(observable => observable(options.enabled, theme));
  };

  componentWillUnmount() {
    this.bodyObserver.disconnect();
  }

  componentDidMount() {
    this.bodyObserver = new MutationObserver(this.observe);
    this.bodyObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }

  render() {
    const { Stylesheet } = this.props;
    this.observe();
    return <Stylesheet />;
  }
}

export default Core;
