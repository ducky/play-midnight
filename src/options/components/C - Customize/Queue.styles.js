import { css } from 'styled-components';

import createStylesheet from 'utils/createStylesheet';

const styles = accentColor => css`
  #queue-overlay {
    width: calc(100vw - 64px);
    max-width: 1000px;
    transform-origin: calc(100% - 64px) calc(100% + 26px);
  }
`;

export default createStylesheet(styles);
