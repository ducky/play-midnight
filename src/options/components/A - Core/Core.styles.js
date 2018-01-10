import { css } from 'styled-components';

const getStyles = accentColor => css`
  body {
    color: ${accentColor};
    transition: color 300ms;
  }
`;

export default getStyles;
