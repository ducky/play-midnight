import { css } from 'styled-components';

import createStylesheet from 'utils/createStylesheet';

const styles = theme => css`
  body #material-app-bar #material-one-left,
  body.qp #material-app-bar #material-one-left,
  body #drawer,
  body.qp #drawer {
    .music-logo-link {
      height: 48px !important;
    }

    .music-logo,
    .menu-logo {
      display: none !important;
    }
  }
`;

export default createStylesheet(styles);
