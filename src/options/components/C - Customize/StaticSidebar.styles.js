import { css } from 'styled-components';

import createStylesheet from 'utils/createStylesheet';

const styles = accentColor => css`
  #left-nav-close-button,
  #material-one-left #left-nav-open-button {
    display: none;
  }

  paper-drawer-panel .left-drawer.narrow-layout.paper-drawer-panel {
    & > #drawer.paper-drawer-panel {
      z-index: 1 !important;
      bottom: 90px !important;
      height: auto !important;
      visibility: visible !important;
      transform: translateX(0) !important;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15) !important;

      #topBar {
        padding: 0 !important;
      }
    }
  }

  #material-breadcrumbs {
    margin-left: 0;
  }

  .material-transfer-status-indicator-container {
    left: 295px !important;
  }

  #main paper-header-panel#content-container {
    width: calc(100% - 280px);
    margin-left: 280px;
  }

  sj-home #backgroundContainer.sj-home {
    left: 280px !important;
  }
`;

export default createStylesheet(styles);
