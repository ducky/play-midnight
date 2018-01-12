import { css } from 'styled-components';

import { colors } from 'style/theme';
import createStylesheet from 'utils/createStylesheet';

const styles = accentColor => css`
  body {
    font-style: italic;
  }
`;

export default createStylesheet(styles);
