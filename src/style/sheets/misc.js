import { css } from 'styled-components';

import { transparentize } from 'style/theme';

const styles = theme => css`
  /* Scrollables */
  paper-dialog-scrollable {
    button.suggestion {
      color: ${theme.font_secondary} !important;
    }

    .download-dialog {
      color: ${theme.font_primary} !important;

      .limit-text {
        color: ${theme.font_secondary} !important;
      }
    }

    &.is-scrolled:not(:first-child)::before,
    &.can-scroll:not([style-scope]):not(.style-scope):not(.scrolled-to-bottom)::after {
      background: ${theme.B700} !important;
    }
  }

  /* Visualizer Card */
  .visualizercard {
    background: ${theme.B400};
    color: ${theme.font_primary};

    .label {
      color: ${theme.font_primary};
    }
  }

  /* Google Labs */
  .labs-card {
    .lab-list-item {
      .lab-name {
        font-weight: 700;
      }

      .lab-description {
        color: ${theme.font_primary};
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${theme.B700};
      }
    }
  }

  /* Shortcuts Table */
  .shortcuts-table {
    color: ${theme.font_primary};

    td,
    th {
      border-bottom: 1px solid ${theme.B700};
      color: ${theme.font_primary};
    }
  }

  .shortcuts-dialog {
    tr {
      border-bottom: 1px solid ${theme.B100};

      &:first-child {
        border-top: 1px solid ${theme.B100};
      }
    }

    caption,
    td {
      color: ${theme.font_primary};
    }
  }

  /* Suggested Query */
  .suggested-query {
    color: ${theme.font_primary};
  }

  /* Album Art */
  .albumImage {
    border: 1px solid ${theme.B700};
    background: ${theme.B400};
  }

  /* Loading Overlay */
  #loading-overlay,
  #loading-overlay[data-type='full-loading-overlay'],
  #loading-overlay[data-type='regular-loading-overlay'],
  .core-overlay-backdrop.core-opened,
  .zoomable-image-dialog-bg {
    background: ${transparentize(theme.B25, 0.8)};
    opacity: 1;
  }

  .iron-overlay-backdrop-0 {
    background-color: ${transparentize(theme.B25, 0.8)};
  }

  /* Upload Music Dialog */
  .simple-dialog-bg,
  .upload-dialog-bg,
  .zoomable-image-dialog-bg {
    background: ${transparentize(theme.B25, 0.8)};
  }

  .upload-dialog {
    background: ${theme.B400};

    .upload-dialog-title-close {
      cursor: pointer;
    }

    .upload-dialog-title {
      color: ${theme.font_primary};
    }

    .upload-dialog-content {
      color: ${theme.font_primary};
    }
  }

  .upload-progress-finished-label,
  .upload-progress-upload-label {
    color: ${theme.font_primary};
  }

  .upload-dialog-dragover {
    .upload-dialog-graphic {
      filter: grayscale(100%);
    }
  }

  /* Explicit */
  .album-view .material-container-details .info .title .explicit,
  .explicit,
  .material .song-row .explicit,
  .material-card .explicit,
  .podcast-series-view .material-container-details .info .title .explicit {
    color: ${theme.B400};
  }

  /* Share Buttons */
  .share-buttons {
    border-bottom: 1px solid ${theme.B700};

    .share-button .button-label {
      color: ${theme.font_primary};
    }
  }

  /* Fade Gradient */
  .fade-out:after,
  .material .fade-out.gray:after,
  .material .fade-out:after {
    background: linear-gradient(
      to right,
      ${transparentize(theme.B400, 0)} 0%,
      ${transparentize(theme.B400, 0.999)} 100%
    );
    background-image: linear-gradient(
      to right,
      ${transparentize(theme.B400, 0)} 0%,
      ${transparentize(theme.B400, 0.999)} 100%
    );
  }

  core-icon[icon='sj:unsubscribe'] svg,
  iron-icon[icon='sj:unsubscribe'] svg {
    path:nth-child(2) {
      fill: ${theme.font_primary};
    }
  }

  /* Default album art & radio station background */
  .card[data-zoomable-image-url$='default_album.svg'] svg,
  .material-card[data-type='album'] svg.image,
  .material-card[data-type='wst'] .quilted-radio-fallback,
  .material-card[data-type='wst'] .quilted-radio-fallback > *,
  img[src$='default_album.svg'],
  img[src$='default_album_art_song_row.png'],
  img[src$='default_album_med.png'],
  img[src$='default_playlist.svg'] {
    filter: invert(100%);
  }

  /* Improve Recommendations */
  paper-header-panel #music-content .g-content {
    padding: 30px 0;
  }

  .nuq-view {
    & > h2 {
      color: ${theme.font_primary};
      margin-bottom: 25px;
    }

    .quiz-item-list {
      padding: 0 25px;
    }

    button.quiz-block {
      cursor: pointer;
      margin-bottom: 15px;

      .name {
        color: ${theme.font_primary};
      }
    }
  }

  .button-bar {
    background: ${theme.B300};
  }
`;

export default styles;
