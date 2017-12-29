import { css } from 'styled-components';

const DEFAULT_ACCENT = '#ed6237';

export const createAccentStyles = (accent = DEFAULT_ACCENT) => {
  return css`
    body {
      background: ${accent} !important;
      color: #dcdcdc;
    }
  `;
};
