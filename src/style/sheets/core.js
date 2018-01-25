import { css } from 'styled-components';

import { transparentize } from 'style/theme';

const styles = theme => css`
  #sliding-action-bar-container {
    background-color: ${theme.B400} !important;
    color: ${theme.font_primary} !important;

    paper-icon-button {
      color: ${theme.font_primary};

      &[disabled] {
        color: ${theme.font_primary};
        opacity: 0.4;
      }
    }
  }

  /* Top Toolbar */
  paper-header-panel#content-container {
    paper-toolbar {
      color: ${theme.font_primary};
    }

    &:not([style-scope]):not(.style-scope):not(.transparent) paper-toolbar#material-app-bar {
      border-bottom: 1px solid ${theme.B300} !important;
    }

    core-icon,
    iron-icon,
    sj-icon-button {
      color: ${theme.font_primary} !important;
    }

    sj-search-box {
      background-color: ${transparentize(theme.B600, 0.5)};
      color: ${theme.font_primary};

      &::-webkit-input-placeholder {
        color: ${theme.font_primary};
      }

      &[opened] {
        background-color: ${theme.B200};

        &::-webkit-input-placeholder {
          color: ${theme.font_secondary};
        }

        &:not([num-suggestions='0']) #input.sj-search-box {
          border-bottom-color: ${theme.B300};
        }
      }

      #input.sj-search-box {
        color: ${theme.font_primary};

        &::-webkit-input-placeholder {
          color: ${theme.font_primary};
        }
      }

      &[opened] {
        background-color: ${theme.B200};

        #input.sj-search-box::-webkit-input-placeholder {
          color: ${theme.font_secondary};
        }
      }

      core-icon,
      iron-icon,
      sj-icon-button {
        color: ${theme.font_primary} !important;
      }
    }

    sj-search-suggestion {
      &.query-selected,
      &:hover {
        background: ${theme.B25};
      }

      .sj-search-suggestion {
        color: ${theme.font_secondary} !important;
      }

      .sub-match.sj-search-suggestion {
        color: ${theme.font_primary} !important;
      }
    }

    .paper-fab-0 iron-icon,
    paper-fab iron-icon,
    sj-fab iron-icon {
      color: ${theme.B500} !important;
    }
  }

  .sj-search-box sj-entity-suggestion.sj-search-box:last-of-type {
    border-bottom: none;
    box-shadow: 0px 3px 3px 0px ${theme.B100};
  }

  .sj-search-box[opened]:not([num-suggestions='0']) #suggestionList.sj-search-box {
    padding: 8px 0 0;
  }

  sj-entity-suggestion #title.sj-entity-suggestion {
    color: $font-primary !important;
  }

  sj-entity-suggestion #subtitle.sj-entity-suggestion {
    color: $font-secondary !important;
  }

  sj-entity-suggestion:hover,
  sj-entity-suggestion.query-selected {
    background-color: ${theme.B25} !important;
  }

  sj-home {
    #backgroundImageContainer.sj-home {
      height: 40vw;
      width: 80vw;
    }

    #gradient.sj-home:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(
          to top,
          ${transparentize(theme.B400, 0.999)} 0%,
          ${transparentize(theme.B400, 0.15)} 75%
        ),
        linear-gradient(to right, ${transparentize(theme.B400, 0.999)} 0%, ${transparentize(theme.B400, 0.15)} 50%) !important;
    }

    &[selected='0'] .home-palette-id-1,
    &[selected='1'] .home-palette-id-1,
    &[selected='2'] .home-palette-id-1,
    &[selected='3'] .home-palette-id-1,
    &[selected='4'] .home-palette-id-1,
    &[selected='5'] .home-palette-id-1,
    &[selected='6'] .home-palette-id-1,
    &[selected='7'] .home-palette-id-1,
    &[selected='8'] .home-palette-id-1,
    &[selected='9'] .home-palette-id-1,
    &[selected='10'] .home-palette-id-1,
    &[selected='11'] .home-palette-id-1,
    &[selected='12'] .home-palette-id-1 {
      color: ${theme.font_primary} !important;
    }

    &[selected='0'] .home-palette-id-2,
    &[selected='1'] .home-palette-id-2,
    &[selected='2'] .home-palette-id-2,
    &[selected='3'] .home-palette-id-2,
    &[selected='4'] .home-palette-id-2,
    &[selected='5'] .home-palette-id-2,
    &[selected='6'] .home-palette-id-2,
    &[selected='7'] .home-palette-id-2,
    &[selected='8'] .home-palette-id-2,
    &[selected='9'] .home-palette-id-2,
    &[selected='10'] .home-palette-id-2,
    &[selected='11'] .home-palette-id-2,
    &[selected='12'] .home-palette-id-2 {
      color: ${theme.font_secondary} !important;
    }
  }

  /* Options Toolbar */
  #sliding_action_bar_container,
  #sliding_action_bar_container.material {
    background: ${theme.B300};
  }

  /* Icons */
  #player .now-playing-actions sj-icon-button,
  #player.material .now-playing-actions sj-icon-button,
  .header-row core-icon[icon='sort'],
  .header-row iron-icon[icon='sort'],
  .nav-item-container core-icon,
  .nav-item-container iron-icon,
  core-icon,
  iron-icon,
  sj-icon-button {
    color: ${theme.font_primary};
  }

  div.icon {
    filter: invert(100%);
  }
`;

export default styles;
