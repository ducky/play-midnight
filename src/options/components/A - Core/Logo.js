import React, { Fragment, PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withPortal from 'hoc/withPortal';

import PlayMusicLogo from 'components/PlayMusicLogo';

@withOptions
@withPortal('#topBar .music-logo-link')
class TopLogo extends PureComponent {
  render() {
    return <PlayMusicLogo />;
  }
}

@withOptions
@withPortal('#drawer .music-logo-link')
class MenuLogo extends PureComponent {
  render() {
    return <PlayMusicLogo />;
  }
}

const Logo = () => (
  <Fragment>
    <TopLogo />
    <MenuLogo />
  </Fragment>
);

export default Logo;
