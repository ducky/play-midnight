import { css } from 'styled-components';

import { transparentize } from 'style/theme';
import { getUrl } from 'lib/api';

import { TRANSITION_FAST } from 'style/theme';

import ThumbsUp from 'assets/images/icon-thumbs-up.svg';
import ThumbsDown from 'assets/images/icon-thumbs-down.svg';
import LoadingWhite from 'assets/images/sprites/ani_loading_white.gif';
import EqualWhite from 'assets/images/sprites/ani_equalizer_white.gif';
import EqualWhiteStatic from 'assets/images/sprites/equalizer_white.png';

const styles = theme => css`
  .song-table {
    &,
    .detail-view & {
      padding: 5px 0 0 0;
    }

    &[data-type='srbm'] {
      border-top: 1px solid ${theme.B600};
    }

    .song-row {
      background: ${theme.B400};
      color: ${theme.font_primary} !important;

      td a {
        color: ${theme.font_secondary} !important;
      }

      [data-col='index'] .hover-button[data-id='play'],
      [data-col='track'] .hover-button[data-id='play'] {
        background-color: transparent;
      }

      .rating-container.thumbs li {
        background-color: transparent;
        filter: invert(100%);
      }

      .rating-container.thumbs {
        li[data-rating='5'] {
          margin-top: 0;
          margin-left: 25px;
        }

        li[data-rating='1'] {
          margin-top: 0;
          margin-left: 8px;
        }
      }

      [data-col='rating'][data-rating='4'],
      [data-col='rating'][data-rating='5'] {
        background-color: inherit;
        background-image: url(${getUrl(ThumbsUp)}) !important;
        background-repeat: no-repeat !important;
        background-position: 26px 8px !important;
        background-size: 24px 24px !important;
      }

      [data-col='rating'][data-rating='1'],
      [data-col='rating'][data-rating='2'] {
        background-color: inherit;
        background-image: url(${getUrl(ThumbsDown)}) !important;
        background-repeat: no-repeat !important;
        background-position: 58px 8px !important;
        background-size: 24px 24px !important;
      }

      td,
      .content,
      .column-content,
      .song-indicator,
      .title-right-items {
        background-color: ${theme.B400} !important;
        color: ${theme.font_primary} !important;
        transition: background ${TRANSITION_FAST};
      }

      .title-right-items {
        line-height: 39px;
      }

      &.currently-playing {
        td[data-col='title'] {
          color: ${theme.font_primary} !important;
        }
      }

      .song-details-wrapper .song-artist-album,
      .song-details-wrapper .song-artist-album a {
        color: ${theme.font_secondary} !important;
      }

      .song-indicator {
        background-size: 24px 24px !important;
      }

      .song-indicator[data-playback-status='loading'] {
        background-image: url(${getUrl(LoadingWhite)});
      }

      .song-indicator[data-playback-status='playing'] {
        background-image: url(${getUrl(EqualWhite)});
      }

      .song-indicator[data-playback-status='paused'] {
        background-image: url(${getUrl(EqualWhiteStatic)}) !important;
        background-repeat: no-repeat !important;
        background-position: center center !important;
      }

      .fade-out:after {
        background: linear-gradient(
          to right,
          ${transparentize(theme.B400, 0)} 0%,
          ${transparentize(theme.B400, 0.999)} 100%
        );
      }

      &:nth-child(odd) {
        td,
        .content,
        .column-content,
        .song-indicator,
        .title-right-items {
          background-color: ${theme.B300} !important;
        }

        .fade-out:after {
          background: linear-gradient(
            to right,
            ${transparentize(theme.B300, 0)} 0%,
            ${transparentize(theme.B300, 0.999)} 100%
          );
        }
      }

      &.hover,
      &.selected-song-row,
      &:hover {
        td,
        .content,
        .column-content,
        .song-indicator,
        .title-right-items {
          background-color: ${theme.B200} !important;
        }

        .title-right-items {
          line-height: 39px;
        }

        .fade-out:after {
          background: linear-gradient(
            to right,
            ${transparentize(theme.B200, 0)} 0%,
            ${transparentize(theme.B200, 0.999)} 100%
          );
        }
      }

      &.currently-playing,
      &.hover,
      &:hover {
        [data-col='index'],
        [data-col='track'] {
          .column-content,
          .content {
            font-size: 0;
          }
        }
      }
    }

    &.mini [data-col='song-details'] .song-details-wrapper .song-title,
    [data-col='title'],
    th {
      color: ${theme.font_primary};
    }
  }

  .top-tracks {
    .song-row {
      .hover-button[data-id='play'] {
        background: ${theme.B200} !important;
      }
    }
  }

  .upload-progress-row td {
    background: ${theme.B400};
    color: ${theme.font_primary};
    border-top: 1px solid ${theme.B600};
  }

  .upload-progress-bar-thumb {
    background: lighten(${theme.B400}, 8%);
    color: ${theme.font_primary};
  }

  .upload-progress-upload-icon-arrow,
  .upload-progress-upload-icon-bar {
    filter: grayscale(100%);
  }

  .cluster-text-protection {
    background: ${theme.B500};

    &:before {
      width: 100%;
      background: ${theme.B500};
    }
  }

  /* Download Styles */
  .song-transfer-table-container {
    .song-transfer-table-row {
      border-bottom: 1px solid ${theme.B600};
    }
  }

  .progress-bar-vertical,
  .progress-bar-horizontal {
    background: lighten(${theme.B400}, 8%);
    border: 1px solid ${theme.B600};
  }
`;

export default styles;
