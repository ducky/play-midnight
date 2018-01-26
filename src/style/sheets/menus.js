import { css } from 'styled-components';

import { getUrl } from 'lib/api';
import { lighten, transparentize } from 'style/theme';

import LoadingWhite from 'assets/images/sprites/ani_loading_white.gif';

const styles = theme => css`
  .paper-dialog-0,
  paper-dialog {
    &::shadow {
      .content,
      .description,
      .dialog-header .episode-title,
      .dialog-header a[data-id='series-navigate'],
      h2,
      p {
        color: ${theme.font_primary} !important;
      }
    }

    .content,
    .description,
    .dialog-header .episode-title,
    .dialog-header a[data-id='series-navigate'],
    h2,
    p {
      color: ${theme.font_primary} !important;
    }
  }

  /* Tabs */
  #material-app-bar .material-header-bar paper-tabs.tab-container,
  #material-app-bar .material-header-bar sj-tabs.tab-container {
    color: ${theme.font_primary};
  }

  .simple-dialog-bg {
    background: ${transparentize(theme.B25, 0.7)};
  }

  .simple-dialog {
    background: ${theme.B400};
    border: 1px solid ${theme.B700};

    .simple-dialog-title {
      background: ${theme.B400};
      color: ${theme.font_primary};
    }

    .simple-dialog-content {
      background: ${theme.B400};
      color: ${theme.font_primary};

      .browseSubtext {
        color: ${theme.font_primary};
        margin-bottom: 5px;
      }
    }

    .edit-section {
      div:first-child {
        margin-bottom: 5px;
      }
    }

    input[type='text'],
    textarea {
      color: ${theme.font_primary};
      background: transparent;
      border: none;
      border-bottom: 1px solid ${theme.font_secondary};

      &:focus {
        outline: none;
      }
    }
  }

  /* Context Menus */
  .goog-menu,
  .goog-menuitem,
  .now-playing-menu.goog-menu,
  .now-playing-menu.goog-menu .goog-menuitem,
  .now-playing-menu.goog-menu .goog-submenu,
  .now-playing-menu.goog-menu .goog-submenu .goog-submenu-arrow {
    background-color: ${theme.B300} !important;
    color: ${theme.font_primary} !important;
  }

  .goog-menu,
  .now-playing-menu.goog-menu {
    border-color: transparent !important;
  }

  .goog-menuitem {
    &:hover {
      background: ${theme.B400} !important;
    }
  }

  .goog-menuheader {
    color: ${theme.font_secondary} !important;

    /* Loading Icon */
    .spinner {
      background: transparent url(${getUrl(LoadingWhite)}) no-repeat center center;
      background-size: 20px 20px;
      width: auto;
      min-width: 20px;
    }
  }

  .extra-links-menu .goog-menuitem-content,
  .goog-menuitem,
  .goog-menuitem-content,
  .now-playing-menu .goog-menuitem .goog-menuitem-content {
    color: ${theme.font_primary} !important;
  }

  .goog-menuitem-highlight .goog-menuitem-content,
  .goog-menuitem-highlight .goog-menuitem-content .goog-submenu-arrow {
    color: ${theme.font_primary} !important;
  }

  .goog-menu {
    .goog-menuitem {
      .goog-menuitem-content {
        color: ${theme.font_primary} !important;
      }

      &:hover {
        background: ${theme.B200} !important;

        .goog-menuitem-content {
          color: ${lighten(theme.font_primary, 3)} !important;
        }
      }
    }

    .goog-submenu {
      iron-icon {
        color: ${theme.font_primary} !important;
      }
    }

    .goog-menuseparator {
      background: ${theme.B200} !important;
    }
  }

  .goog-menuitem-content .goog-submenu-arrow,
  .now-playing-menu .goog-submenu .goog-submenu-arrow {
    color: ${theme.font_primary} !important;
  }

  .goog-menuseparator {
    border-top: 1px solid ${theme.B500} !important;
  }
`;

export default styles;
