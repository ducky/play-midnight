import { css } from 'styled-components';

import { transparentize, TRANSITION_FAST } from 'style/theme';

const styles = theme => css`
  #drawer-panel #material-hero-image {
    background: ${theme.B500};
  }

  .material-detail-view .material-container-details .read-more-button {
    &:hover {
      background: ${theme.B200};
    }
  }

  #material-app-bar .header-tab-title,
  .cluster .header,
  .cluster .header .cluster-title,
  .cluster .header .title,
  .cluster.material-cluster .header h2.title,
  .material-detail-view .artist-details .bio-wrapper .bio,
  .material-detail-view .material-container-details .info .description,
  .recommended-header,
  .section-header,
  .settings-cluster .header,
  .song-table [data-col='index'],
  .song-table [data-col='track'] {
    color: ${theme.font_primary};
  }

  .cluster .header .subtitle,
  .cluster.material-cluster .header span.subtitle {
    color: ${theme.font_secondary};
  }

  .material-album-container,
  .material-detail-view .artist-details,
  .material-playlist-container,
  .situations-filter,
  .songlist-container,
  .song-table,
  .top-tracks-info,
  .more-songs-container {
    background: ${theme.B400};
  }

  .playlist-view .editable:hover,
  .situations-content.material .situations-filter sj-item:focus,
  .situations-content.material .situations-filter sj-item:hover {
    background: ${theme.B200};
  }

  gpm-vertical-list {
    #items.gpm-vertical-list {
      background-color: ${theme.B400} !important;
      color: ${theme.font_primary} !important;

      a {
        color: ${theme.font_primary} !important;
      }

      & > *:hover,
      & > *[focused] {
        background-color: ${theme.B200} !important;
      }
    }
  }

  .situations-content.material .situations-filter sj-item:not(:last-child) .material-filter {
    border-bottom: 1px solid ${theme.B300};
  }

  .material-detail-view .material-container-details .info .container-stats-container .container-stats span {
    color: ${theme.font_secondary};
  }

  .material-detail-view .material-container-details .actions {
    border-top: 1px solid ${theme.B200};
  }

  .material-detail-view .top-tracks {
    background: ${theme.B400};
  }

  /* Subcategories */
  .subcategories-list {
    background: ${theme.B400};

    .subcategory {
      &:not(:last-child) {
        border-bottom: 1px solid ${theme.B300};
      }

      &:focus,
      &:hover {
        background: ${theme.B200};
      }
    }

    li {
      &:not(:last-child) {
        .li-content {
          border-bottom: 1px solid ${theme.B300};
        }
      }

      a:focus,
      a:hover {
        background: ${theme.B200};
      }
    }
  }

  /* Page Play Button (Top Right) */
  .material-container-details sj-fab {
    &::shadow core-icon {
      g {
        path:nth-child(1) {
          fill: ${theme.B300};
        }
      }
    }
  }

  /* Banner */
  #music-content .material-banner.banner.new-user-quiz-card,
  #music-content .material-banner.banner.ws-search-banner,
  #music-content .material-banner.banner.ws-subscriber-card {
    background: ${theme.B400};

    .title {
      color: ${theme.font_primary};
    }
  }

  /* Homepage Scrolling Module */
  sj-scrolling-module {
    h2 {
      color: ${transparentize(theme.white, 0.9)} !important;
      text-shadow: 1px 1px 3px ${theme.B400};
    }

    .module-subtitle {
      color: ${transparentize(theme.white, 0.7)};
      text-shadow: 1px 1px 3px ${theme.B400};
    }
  }

  /* More Songs */
  .more-songs-container {
    border-top: 1px solid ${theme.B300};
  }

  /* Playlist/Artist/Albums Header */
  .gpm-detail-page-header div.gpm-detail-page-header [slot='title'] {
    color: ${transparentize(theme.font_primary, 0.87)} !important;
  }

  gpm-detail-page-header div.gpm-detail-page-header [slot='subtitle'],
  gpm-detail-page-header div.gpm-detail-page-header [slot='description'],
  gpm-detail-page-header div.gpm-detail-page-header [slot='metadata'] {
    color: ${transparentize(theme.font_primary, 0.54)} !important;
  }

  gpm-detail-page-header[description-overflows] #descriptionWrapper.gpm-detail-page-header {
    background: transparent !important;
    border-color: transparent;
    margin-bottom: 4px;
    transition: border ${TRANSITION_FAST}, padding ${TRANSITION_FAST};
    cursor: pointer;

    & > [slot='description'] {
      margin: 0 !important;
    }
  }

  gpm-detail-page-header[description-overflows] #descriptionWrapper.gpm-detail-page-header:hover {
    background: transparent !important;
    padding-left: 8px;
    border-left: 3px solid ${theme.A500};
  }

  .gpm-detail-page-header div.gpm-detail-page-header [slot='buttons'] {
    color: ${transparentize(theme.font_primary, 0.87)} !important;
  }

  .station-container-content-wrapper .material-container-details {
    background: ${theme.B400};
  }

  gpm-action-buttons {
    border-top: 1px solid ${theme.B300};
  }
`;

export default styles;
