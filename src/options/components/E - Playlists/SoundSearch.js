import React, { PureComponent } from 'react';

import withOptions from 'hoc/withOptions';
import withPortal from 'hoc/withPortal';

const OPTION_ID = 'soundSearch';

@withOptions
@withPortal(OPTION_ID, '#playlist-drawer .autoplaylist-section')
class soundSearch extends PureComponent {
  render() {
    const { isActive } = this.props;

    return isActive(OPTION_ID) ? (
      <div className="playlist-drawer-item " data-type="ap" data-id="sound-search">
        <iron-icon icon="search" />
        <sj-play-button
          data-id="play"
          size="mini"
          play-label="Play Sound Search"
          pause-label="Pause Sound Search"
          role="button"
          tabindex="0"
          aria-disabled="false"
          elevation="0"
          aria-label="Play Sound Search"
        />
        <a className="playlist-wrapper" href="">
          <div className="playlist-title">Sound search</div>
        </a>
      </div>
    ) : null;
  }
}

export default soundSearch;
