import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import observables from './Core.observables';
import styles from './Core.styles';

@withOptions
@withStyles(styles)
class Core extends PureComponent {
  componentWillUnmount() {
    this.bodyObserver.disconnect();
  }

  componentDidMount() {
    this.bodyObserver = new MutationObserver(() => {
      observables.forEach(observable => observable());
    });

    this.bodyObserver.observe(document.body, { childList: true });
  }

  render() {
    const { Stylesheet } = this.props;
    return <Stylesheet />;
  }
}

export default Core;
