import { css } from 'styled-components';

const styles = theme => css`
  sj-callout {
    /* Saved */
  }

  gpm-bottom-sheet {
    background: ${theme.B300} !important;

    h2,
    h2 span {
      color: ${theme.font_primary} !important;
    }

    p,
    p span {
      color: ${theme.font_secondary} !important;
    }
  }
`;

export default styles;
