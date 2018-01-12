import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './Core.styles';

const OPTION_ID = 'core';

@withOptions
@withStyles(styles)
class Core extends PureComponent {
  updateRecentActivity = () => {
    const urlRegex = /(=s90)/;
    const gridItems = document.querySelectorAll('sj-scrolling-module[module-token="CLIENT_SIDE_RECENTS"] sj-card');

    for (let i = 0, len = gridItems.length; i < len; i++) {
      const item = gridItems[i];

      if (!item) continue;

      const img = item.querySelector('img');

      if (img && urlRegex.test(img.src)) {
        img.setAttribute('src', img.src.replace('=s90', '=s150'));
      }
    }
  };

  componentWillUnmount() {
    this.bodyObserver.disconnect();
  }

  componentDidMount() {
    this.bodyObserver = new MutationObserver(() => {
      this.updateRecentActivity();
    });

    this.bodyObserver.observe(document.body, { childList: true });
  }

  render() {
    const { Stylesheet } = this.props;
    return <Stylesheet />;
  }
}

export default Core;
