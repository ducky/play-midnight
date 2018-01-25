import { css } from 'styled-components';

import { transparentize } from 'style/theme';
import accents from 'style/sheets/accents';
import createStylesheet from 'utils/createStylesheet';

import { TRANSITION_FAST } from 'style/theme';

const styles = theme => css`
  ${accents(theme)};

  html:not([style-scope]):not(.style-scope) {
    --light-theme-text-color: ${theme.font_primary};
    --light-theme-secondary-color: ${theme.font_secondary};
  }

  body,
  body.material {
    background-color: ${theme.background};
    color: ${theme.font_primary};
    transition: background ${TRANSITION_FAST};
  }

  ::-webkit-scrollbar-track,
  ::shadow ::-webkit-scrollbar-track {
    background-color: ${transparentize(theme.background_page, 0.6)};

    &:hover {
      background-color: ${transparentize(theme.background_page, 0.7)};
    }

    &:active {
      background-color: ${transparentize(theme.background_page, 0.65)};
    }
  }

  #music-content {
    color: ${theme.font_primary};
  }

  /* Links */
  .music-source-empty-message,
  .nav-item-container,
  .simple-dialog a,
  a {
    color: ${theme.font_primary} !important;
  }

  #material-app-bar {
    background: ${theme.background_nav};
    border-bottom-color: ${theme.border_nav} !important;
    transition: background ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};
  }

  #player {
    background: ${theme.background_player};
    transition: background ${TRANSITION_FAST};
  }

  /* Background Panes - Fading */
  sj-home {
    #backgroundContainer #backgroundColor {
      background-color: ${theme.background};
    }

    #backgroundContainer #backgroundImageContainer {
      transition: opacity ${TRANSITION_FAST};
    }
  }

  sj-home[selected='0'],
  sj-home[selected='1'] {
    #backgroundContainer #backgroundColor {
      background-color: ${theme.background} !important;
      transition: background-color ${TRANSITION_FAST};
    }

    #backgroundContainer #backgroundImageContainer {
      opacity: 0;
      transition: none;
    }
  }
`;

export default createStylesheet(styles);
