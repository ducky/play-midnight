import { css } from 'styled-components';

import { transparentize, isDark, TRANSITION_FAST } from 'style/theme';

const styles = theme => css`
  #material-app-bar {
    background: ${theme.B400};
    border-bottom-color: ${theme.B600} !important;
    transition: background ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};
  }

  #nav_collections .nav-item-container,
  .nav-item-container,
  .playlists-container .nav-item-container {
    .owner-name {
      color: ${theme.font_secondary};
    }

    paper-icon-button iron-icon {
      color: ${theme.font_primary};
    }

    &.selected,
    &.selected:focus,
    &.selected:hover,
    &:focus,
    &:hover {
      background: ${theme.B300};

      .fade-out:after {
        background: linear-gradient(
          to right,
          ${transparentize(theme.B300, 0)} 0%,
          ${transparentize(theme.B300, 0.999)} 100%
        );
      }
    }

    &.playlist-drag-target {
      background: ${theme.B200};

      .fade-out:after {
        background: linear-gradient(
          to right,
          ${transparentize(theme.B200, 0)} 0%,
          ${transparentize(theme.B200, 0.999)} 100%
        );
      }
    }

    .fade-out:after {
      background: linear-gradient(
        to right,
        ${transparentize(theme.B400, 0)} 0%,
        ${transparentize(theme.B400, 0.999)} 100%
      );
    }
  }

  .nav-section-header {
    color: ${theme.font_secondary};
  }

  .nav-section-divider {
    border-bottom: 1px solid ${theme.B600} !important;
  }

  .new-playlist-drawer {
    #nav-container {
      background: ${theme.B400};

      .nav-toolbar {
        background: ${theme.B400};

        .toolbar-tools {
          padding: 0 10px;
        }
      }

      #nav {
        background: ${theme.B400};
        border-top: 1px solid ${theme.B700};
      }
    }
  }

  /* Playlist */
  sj-right-drawer #drawer.sj-right-drawer {
    background: ${theme.B400};
  }

  #playlist-drawer {
    .playlist-title,
    #mainPanel iron-icon,
    #playlist-drawer-header {
      color: ${theme.font_primary} !important;
    }

    .playlist-owner {
      color: ${theme.font_secondary} !important;
    }

    paper-header-panel[at-top] paper-toolbar,
    #recent-playlists-container,
    .autoplaylist-section {
      border-bottom-color: ${theme.B700} !important;
    }

    .playlist-drawer-item {
      color: ${theme.font_primary} !important;

      .playlist-wrapper {
        &:active,
        &:focus,
        &:hover {
          background: ${theme.B300};
        }
      }
    }
  }

  #playlist-drawer .playlist-drawer-item .playlist-wrapper:focus,
  #playlist-drawer .playlist-drawer-item .playlist-wrapper:hover,
  #playlist-drawer .playlist-drawer-item iron-icon:hover ~ .playlist-wrapper,
  #playlist-drawer .playlist-drawer-item sj-play-button:hover ~ .playlist-wrapper,
  #playlist-drawer .playlist-drawer-item.playlist-drop-target:not(.subscribed) .playlist-wrapper {
    background: ${theme.B300};
  }

  #playlist-drawer paper-header-panel paper-toolbar:not([style-scope]):not(.style-scope) {
    background: ${theme.B400};
  }

  #playlist-drawer paper-header-panel[at-top] paper-toolbar:not([style-scope]):not(.style-scope) {
    border-bottom-color: ${theme.B700};
  }

  .nav-toolbar {
    background: ${theme.B300};
  }

  .my-devices-card .device-list-item:not(:last-child) {
    border-bottom: 1px solid ${theme.B700};
  }

  /* Google Stuff */
  paper-toolbar #material-one-right #gb {
    a {
      color: ${theme.black} !important;
    }

    .gb_dc {
      filter: ${isDark(theme.B500) ? 'invert(100%)' : 'none'};
    }
  }
`;

export default styles;
