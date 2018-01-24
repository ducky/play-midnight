import { css } from 'styled-components';

import { colors } from 'style/theme';
import accents from 'style/sheets/accents';
import createStylesheet from 'utils/createStylesheet';

import { getUrl } from 'lib/api';
import PlayMusicLogo from 'assets/images/play_music_logo_dark.png';

const styles = accentColor => css`
  ${accents(accentColor)};

  body {
    background: ${colors.background_dark};
    color: ${colors.font_primary}
    transition: background 300ms;
  }

  body.qp #material-app-bar #material-one-left {
    .music-logo-link {
      display: none;
      width: 170px;
      height: 60px;
      margin-top: -6px;
    }

    .music-logo {
      width: 170px;
      height: 60px;
      background: ${accentColor} url(${getUrl(PlayMusicLogo)}) no-repeat center center;
      background-size: 170px auto;
    }
  }

  #material-app-bar {
    background: ${colors.background_nav};
    border-bottom-color: ${colors.border_nav} !important;
    transition: background 300ms;
  }

  #player {
    background: ${colors.background_player};
    transition: background 300ms;
  }

  /* Background Panes - Fading */
  sj-home {
    #backgroundContainer #backgroundColor {
      background-color: ${colors.background_dark};
    }

    #backgroundContainer #backgroundImageContainer {
      transition: opacity 300ms;
    }
  }

  sj-home[selected='0'],
  sj-home[selected='1'] {
    #backgroundContainer #backgroundColor {
      background-color: ${colors.background_dark} !important;
      transition: background-color 300ms;
    }

    #backgroundContainer #backgroundImageContainer {
      opacity: 0;
      transition: none;
    }
  }
`;

export default createStylesheet(styles);
