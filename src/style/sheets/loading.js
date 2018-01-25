import { css } from 'styled-components';

const styles = theme => css`
  /* Initial Loading Screen */
  #loading-progress {
    background-color: ${theme.B500};
  }

  #loading-progress-message {
    color: ${theme.font_secondary};
  }

  #loading-progress-bar,
  #loading-progress-content #progressContainer,
  #loading-progress-content > div:nth-child(2) {
    background: ${theme.B300} !important;
    border: none;
  }

  #loading-progress-content #progressContainer #secondaryProgress {
    background: ${theme.B100};
  }

  #loading-progress-content div:last-child {
    color: ${theme.font_secondary} !important;
  }

  gpm-loading-indicator #contentWrapper.gpm-loading-indicator {
    background: ${theme.B500};
    color: ${theme.font_primary};
  }
`;

export default styles;
