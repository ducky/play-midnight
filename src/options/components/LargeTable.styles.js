import { css } from 'styled-components';

import { getUrl } from 'lib/api';

import createStylesheet from 'utils/createStylesheet';
import ThumbsUp from 'assets/images/icon-thumbs-up.svg';
import ThumbsDown from 'assets/images/icon-thumbs-down.svg';

const styles = theme => css`
  .song-table.tight {
    .song-row {
      td {
        height: 64px;
        line-height: 64px;
        max-height: 64px;
        min-height: 64px;
        font-size: 16px;
      }

      .column-content {
        height: 64px;
      }

      .song-indicator {
        margin-top: 10px !important;
        width: 44px !important;
        height: 44px !important;
        padding: 0 !important;
        background-size: 24px 24px !important;
      }

      .hover-button[data-id='play'] {
        top: 10px !important;
        width: 44px !important;
        height: 44px !important;
      }

      [data-col='song-details'] img,
      [data-col='title'] img {
        height: 44px !important;
        width: 44px !important;
        padding: 0 !important;
        margin-top: 10px !important;
      }

      [data-col='title'] img {
        margin-right: 16px;
      }

      .song-details-wrapper {
        margin-top: 16px !important;
        left: 60px !important;

        .song-title {
          height: 20px !important;
          font-size: 16px !important;
          line-height: 20px !important;
        }

        .song-artist-album {
          height: 16px !important;
          font-size: 14px !important;
          line-height: 16px !important;
        }
      }

      .title-right-items {
        line-height: 64px !important;
      }

      paper-icon-button[data-id='menu'] {
        margin: 12px 0 0 0 !important;
      }

      .rating-container.thumbs {
        margin-top: 20px;

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
        background-position: 25px 21px !important;
        background-size: 24px 24px !important;
      }

      [data-col='rating'][data-rating='1'],
      [data-col='rating'][data-rating='2'] {
        background-color: inherit;
        background-image: url(${getUrl(ThumbsDown)}) !important;
        background-repeat: no-repeat !important;
        background-position: 57px 20px !important;
        background-size: 24px 24px !important;
      }
    }
  }
`;

export default createStylesheet(styles);
