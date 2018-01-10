import { css } from 'styled-components';

import { colors } from 'style/theme';

const getStyles = accentColor => css`
  body {
    background: #141517;
    transition: background 300ms;
  }

  #player {
    background: ${colors.background_player};
  }
`;

export default getStyles;
