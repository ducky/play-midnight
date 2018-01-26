import { css } from 'styled-components';

import { transparentize } from 'style/theme';

const styles = theme => css`
  gpm-card-grid,
  gpm-now-card-grid {
    sj-play-button {
      #buttonContent.sj-play-button {
        background: ${theme.B25} !important;
      }

      #icon.sj-play-button {
        fill: ${theme.font_primary} !important;
      }
    }

    [slot='title'],
    #gridTitle {
      color: ${theme.font_primary} !important;
    }

    sj-card {
      &[card-aspect-ratio='wide'] {
        background-color: ${theme.B400} !important;

        [slot='title'],
        .card-title {
          color: ${transparentize(theme.white, 0.9)} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }

        [slot='reason'],
        .card-reason {
          color: ${transparentize(theme.white, 0.7)} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }

        [slot='subtitle'],
        .card-subtitle {
          color: ${theme.font_secondary} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }

        [slot='description'],
        .card-description {
          color: ${theme.font_secondary} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }
      }

      &:not([card-aspect-ratio='wide']) {
        [slot='title'],
        .card-title {
          color: ${transparentize(theme.white, 0.9)} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }

        [slot='subtitle'],
        .card-subtitle {
          color: ${transparentize(theme.white, 0.7)} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }

        [slot='reason'],
        .card-reason {
          color: ${transparentize(theme.white, 0.7)} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
        }

        [slot='description'],
        .card-description {
          color: ${transparentize(theme.white, 0.6)} !important;
          text-shadow: 1px 1px 3px ${theme.B400} !important;
          padding-bottom: 3px !important;
        }
      }
    }

    gpm-colored-now-card {
      #textProtection {
        background: linear-gradient(
          to top,
          ${transparentize(theme.B400, 0.999)},
          ${transparentize(theme.B400, 0.15)}
        ) !important;
      }

      [slot='title'],
      [slot='header'],
      .card-header {
        color: ${transparentize(theme.white, 0.9)} !important;
        text-shadow: 1px 1px 3px ${theme.B400} !important;
      }

      [slot='reason'],
      .card-reason {
        color: ${transparentize(theme.white, 0.7)} !important;
        text-shadow: 1px 1px 3px ${theme.B400} !important;
      }

      #textSeparator {
        background: ${transparentize(theme.white, 0.7)} !important;
        box-shadow: 1px 1px 3px ${theme.B400} !important;
      }

      .card-title {
        color: ${transparentize(theme.white, 0.9)} !important;
        text-shadow: 1px 1px 3px ${theme.B400} !important;
      }

      [slot='description'],
      [slot='subtitle'],
      .card-description {
        color: ${transparentize(theme.white, 0.6)} !important;
        text-shadow: 1px 1px 3px ${theme.B400} !important;
        padding-bottom: 3px !important;
      }
    }
  }
`;

export default styles;
