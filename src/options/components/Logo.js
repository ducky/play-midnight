import React, { Fragment, PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withPortal from 'hoc/withPortal';
import withStyles from 'hoc/withStyles';

import PlayMusicLogo from 'components/PlayMusicLogo';
import styles from './Logo.styles';

@withOptions
@withPortal('#topBar .music-logo-link')
class TopLogo extends PureComponent {
  render() {
    const { isActive } = this.props;
    return <PlayMusicLogo enabled={isActive('enabled')} />;
  }
}

@withOptions
@withPortal('#drawer .music-logo-link')
class MenuLogo extends PureComponent {
  render() {
    const { isActive } = this.props;
    return <PlayMusicLogo enabled={isActive('enabled')} />;
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
