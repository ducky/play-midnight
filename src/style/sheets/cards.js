import { css } from 'styled-components';

import { transparentize } from 'style/theme';

const styles = theme => css`
  .info-card,
  .material-card,
  .settings-card {
    background: ${theme.B400};
    color: ${theme.font_primary};

    .title {
      color: ${theme.font_primary} !important;
    }

    .sub-title {
      color: ${theme.font_secondary} !important;
    }

    &[data-is-listen-now='true'] .reason .reason-text {
      color: ${theme.font_primary};
    }

    &[data-type='situations'][data-is-podlist-situation='true'] .podcast-badge {
      background: ${theme.B400};
    }

    &[data-type='album'] .details .fade-out:after {
      background: linear-gradient(
        to right,
        ${transparentize(theme.B400, 0)} 0%,
        ${transparentize(theme.B400, 0.999)} 100%
      );
    }

    &[data-type='artist'] .details .fade-out:after {
      background: linear-gradient(
        to right,
        ${transparentize(theme.B500, 0)} 0%,
        ${transparentize(theme.B500, 0.999)} 100%
      );
    }

    .details {
      background: ${theme.B400};
    }

    &.entity-card {
      background: transparent;

      .image-wrapper {
        background: ${theme.B200};
      }

      .details {
        background: transparent;
      }
    }

    .details sj-icon-button.menu-anchor {
      color: ${theme.font_primary};
    }

    /* Feeling Lucky */
    &[data-size='small'][data-type='imfl'] .title {
      color: ${theme.font_primary};
    }

    &[data-size='small'][data-type='imfl'] .sub-title {
      color: ${theme.font_secondary};
    }
  }

  /* Info Card */
  #music-content .info-card {
    background-color: ${theme.B400};

    .title {
      color: ${theme.font_primary};
    }

    .sub-title {
      color: ${theme.font_secondary};
    }
  }

  /* Songza cards */
  .material-card[data-type='situations'][data-is-podlist-situation='true'] iron-icon.podcast-badge {
    background-color: ${theme.B400};
  }
`;

export default styles;
