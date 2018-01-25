import React, { Fragment, PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withPortal from 'hoc/withPortal';
import withStyles from 'hoc/withStyles';

import PlayMusicLogo from 'components/PlayMusicLogo';
import styles from './Logo.styles';

@withPortal('#topBar .music-logo-link')
class TopLogo extends PureComponent {
  render() {
    return <PlayMusicLogo />;
  }
}

@withPortal('#drawer .music-logo-link')
class MenuLogo extends PureComponent {
  render() {
    return <PlayMusicLogo />;
  }
}

@withOptions
@withStyles(styles)
class Logo extends PureComponent {
  render() {
    const { isActive, Stylesheet } = this.props;
    const enabled = isActive('enabled') || isActive('accentsOnly');

    return enabled ? (
      <Fragment>
        <TopLogo />
        <MenuLogo />
        <Stylesheet />
      </Fragment>
    ) : null;
  }
}

export default Logo;
