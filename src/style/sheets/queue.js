import { css } from 'styled-components';

import { transparentize } from 'style/theme';

const styles = theme => css`
  #queue-overlay {
    z-index: 501 !important;
  }

  #queue-overlay,
  paper-dialog {
    background: ${theme.B300} !important;

    &::shadow #scroller {
      margin-bottom: 0;
    }

    #mini-queue-details img.large {
      width: 100%;
      height: auto;
    }

    .song-row {
      .column-content,
      .content,
      .title-right-items,
      td {
        background-color: ${theme.B300} !important;
      }

      .song-indicator {
        background-color: ${theme.B300} !important;
      }

      .fade-out:after {
        background: linear-gradient(
          to right,
          ${transparentize(theme.B300, 0)} 0%,
          ${transparentize(theme.B300, 0.999)} 100%
        );
      }

      &:nth-child(odd) {
        .column-content,
        .content,
        .title-right-items,
        td {
          background-color: ${theme.B200} !important;
        }

        .song-indicator {
          background-color: ${theme.B200} !important;
        }

        .fade-out:after {
          background: linear-gradient(
            to right,
            ${transparentize(theme.B200, 0)} 0%,
            ${transparentize(theme.B200, 0.999)} 100%
          );
        }
      }

      &.hover,
      &.selected-song-row,
      &:hover {
        .column-content,
        .content,
        .title-right-items,
        td {
          background-color: ${theme.B100} !important;
        }

        .song-indicator {
          background-color: ${theme.B100} !important;
        }

        .fade-out:after {
          background: linear-gradient(
            to right,
            ${transparentize(theme.B100, 0)} 0%,
            ${transparentize(theme.B100, 0.999)} 100%
          );
        }
      }
    }

    .upload-progress-row {
      td {
        background-color: ${theme.B300};
        color: ${theme.font_primary};
      }

      .fade-out:after {
        background: linear-gradient(
          to right,
          ${transparentize(theme.B300, 0)} 0%,
          ${transparentize(theme.B300, 0.999)} 100%
        );
      }
    }

    &:after {
      border-color: transparent transparent ${theme.B300} ${theme.B300};
    }

    #mini-queue-details .imfl-image {
      filter: grayscale(100%);
    }
  }

  .material-empty .empty-message,
  .material-empty .empty-submessage {
    color: ${theme.font_secondary};
  }
`;

export default styles;
