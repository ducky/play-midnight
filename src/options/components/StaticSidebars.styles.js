import { css } from 'styled-components';

import createStylesheet from 'utils/createStylesheet';

const styles = theme => ({
  staticPlaylists: css`
    #playlist-drawer-button {
      display: none;
    }

    #playlist-drawer {
      height: calc(100% - 90px);

      #topBar {
        background: ${theme.enabled ? theme.B300 : '#fff'} !important;
      }

      #drawer {
        z-index: 2 !important;
        bottom: 90px !important;
        height: auto !important;
        visibility: visible !important;
        transform: translateX(0) !important;
        transition: none !important;
      }

      #scrim {
        display: none;
      }
    }

    sj-right-drawer #drawer.sj-right-drawer {
      box-shadow: none !important;
    }

    #pageIndicatorContainer.sj-home {
      right: 324px !important;
    }

    #main paper-header-panel#content-container {
      width: auto !important;
      margin-right: 300px;
    }

    .play-midnight-fab {
      right: 324px;
    }

    #queue-overlay {
      right: 324px;

      &:after {
        display: none;
      }
    }

    sj-home #backgroundContainer.sj-home {
      right: 300px !important;
    }
  `,
  staticSidebar: css`
    #left-nav-close-button,
    #material-one-left #left-nav-open-button,
    #material-one-left .music-logo-link,
    #quick-nav-container {
      display: none !important;
    }

    #drawer paper-toolbar {
      background: ${theme.enabled ? theme.B300 : '#fff'} !important;
    }

    paper-drawer-panel .left-drawer.narrow-layout.paper-drawer-panel {
      & > #drawer.paper-drawer-panel {
        z-index: 1 !important;
        bottom: 90px !important;
        height: auto !important;
        visibility: visible !important;
        transform: translateX(0) !important;
        box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.4) !important;
        transition: none !important;

        #topBar {
          padding: 0 !important;
        }
      }
    }

    .new-playlist-drawer #nav-container #nav {
      border: none !important;
    }

    #material-breadcrumbs {
      margin-left: 0;
    }

    .material-transfer-status-indicator-container {
      left: 295px !important;
    }

    #main paper-header-panel#content-container {
      width: auto !important;
      margin-left: 280px !important;
    }

    sj-home #backgroundContainer.sj-home {
      left: 280px !important;
    }
  `,
});

export default createStylesheet(styles);
