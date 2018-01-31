import { css } from 'styled-components';

import { isLight, FONT_DARK, FONT_LIGHT, TRANSITION_FAST } from 'style/theme';

const styles = theme => css`
  html:not([style-scope]):not(.style-scope) {
    --default-primary-color: ${theme.A500};
    --primary-color: ${theme.A500};
  }

  /*  Scrollbar */
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.A500};
    transition: background ${TRANSITION_FAST};

    &:hover {
      background: ${theme.A400};
    }

    &:active {
      background: ${theme.A300};
    }
  }

  .primary:not([style-scope]):not(.style-scope) {
    color: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  /*  Uploading Music */
  .material-transfer-radial-download-overlay,
  .material-transfer-radial-processing-overlay,
  .material-transfer-radial-upload-overlay {
    background: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Menu Selected */
  .goog-menu .goog-menuitem.selected .goog-menuitem-content:not([style-scope]):not(.style-scope),
  .goog-menu:not([style-scope]):not(.style-scope)
    .goog-menuitem.selected:not([style-scope]):not(.style-scope)
    .goog-menuitem-content:not([style-scope]):not(.style-scope) {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};

    &:hover {
      color: ${theme.A500} !important;
    }
  }

  /*  Chevron Icons */
  .cluster.material-cluster .lane-button core-icon,
  .cluster.material-cluster .lane-button iron-icon {
    color: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Toggle Button */
  paper-toggle-button[checked]:not([disabled]) {
    .toggle-bar.paper-toggle-button,
    .toggle-button.paper-toggle-button {
      background-color: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }

    .toggle-ink.paper-toggle-button {
      color: ${theme.A500} !important;
      transition: color ${TRANSITION_FAST};
    }
  }

  /*  Checkbox */
  paper-checkbox {
    #checkbox.checked {
      background-color: ${theme.A500} !important;
      border-color: ${theme.A500} !important;
      transition: border-color ${TRANSITION_FAST}, background ${TRANSITION_FAST};
    }

    #ink[checked],
    #ink[checked].paper-checkbox {
      color: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }

    #checkbox.checked,
    #checkbox.checked.paper-checkbox {
      background-color: ${theme.A500} !important;
      border-color: ${theme.A500} !important;
      transition: border-color ${TRANSITION_FAST}, background ${TRANSITION_FAST};
    }
  }

  /*  Buttons */
  .button.primary,
  .simple-dialog-buttons button.goog-buttonset-default,
  paper-button.material-primary,
  paper-button.material-primary:not([raised])[focused],
  sj-paper-button.material-primary {
    background: ${theme.A500} !important;
    color: ${isLight(theme.A500) ? FONT_LIGHT : FONT_DARK} !important;
    transition: background ${TRANSITION_FAST}, color ${TRANSITION_FAST};

    &:hover {
      background: ${theme.A500} !important;
    }
  }

  .info-card:not([style-scope]):not(.style-scope):not(.szsb-card):not(.add-your-music) paper-button,
  .top-charts-view .song-row [data-col='index'] .column-content:not([style-scope]):not(.style-scope),
  .upload-dialog-dragover .upload-dialog-description:not([style-scope]):not(.style-scope),
  .ups.light iron-icon:not([style-scope]):not(.style-scope),
  paper-dialog .buttons paper-button:not([style-scope]):not(.style-scope):not([disabled]),
  paper-toast paper-button[data-action='button']:not([style-scope]):not(.style-scope) {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  paper-action-dialog sj-paper-button,
  paper-dialog .buttons paper-button:not([style-scope]):not(.style-scope):not([disabled]) {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  #music-content .material-banner.banner.new-user-quiz-card sj-paper-button,
  #music-content .material-banner.banner.ws-search-banner sj-paper-button,
  #music-content .material-banner.banner.ws-subscriber-card sj-paper-button {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  .more-songs-container.primary > paper-button {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  paper-toast [data-action='button'],
  paper-toast div[data-action='button'] {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  sj-callout {
    background: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  paper-icon-button.sj-callout-target:not([style-scope]):not(.style-scope) {
    background-color: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  gpm-bottom-sheet {
    #buttonRow {
      paper-button {
        background-color: ${theme.A500} !important;
        transition: background ${TRANSITION_FAST};

        span {
          color: ${isLight(theme.A500) ? FONT_LIGHT : FONT_DARK} !important;
          transition: color ${TRANSITION_FAST};
        }

        &:first-child {
          background-color: transparent !important;

          span {
            color: ${theme.A500} !important;
          }
        }
      }
    }
  }

  sj-play-button #buttonContent.sj-play-button,
  .sj-play-button-0 #buttonContent.sj-play-button {
    background-color: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  /*  Playlist button */
  #unsubscribe-playlist-button,
  sj-paper-button#unsubscribe-playlist-button {
    .icon[icon='add-circle'],
    .playlist-subscribed {
      color: ${theme.A500};
      transition: color ${TRANSITION_FAST};
    }
  }

  .sj-play-button-0 #pulse.sj-play-button {
    background: ${theme.A500};
    opacity: 0.3;
    transition: background ${TRANSITION_FAST};
  }

  /*  Links */
  .music-source-empty-message,
  .nav-item-container,
  .simple-dialog a,
  a {
    &.primary,
    &.primary:not([style-scope]):not(.style-scope) {
      color: ${theme.A500};
      transition: color ${TRANSITION_FAST};
    }
  }

  /*  Top Toolbar */
  #nav-container #music-content.material .material-cover {
    background-color: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Inputs */
  paper-input-container,
  paper-input-decorator {
    &::shadow .focused-underline {
      background: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }

    &[focused]::shadow .floated-label .label-text {
      color: ${theme.A500} !important;
      transition: color ${TRANSITION_FAST};
    }

    .focused-line.paper-input-container {
      background: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }

    .add-on-content.is-highlighted.paper-input-container *,
    .input-content.label-is-floating.paper-input-container label,
    .input-content.label-is-floating.paper-input-container .paper-input-label,
    .input-content.label-is-highlighted.paper-input-container .paper-input-label,
    .input-content.label-is-highlighted.paper-input-container label {
      color: ${theme.A500} !important;
      transition: color ${TRANSITION_FAST};
    }
  }

  /*  Popup Dialog */
  paper-dialog,
  paper-action-dialog {
    paper-input-decorator {
      &::shadow .focused-underline {
        background: ${theme.A500};
        transition: background ${TRANSITION_FAST};
      }

      &[focused]::shadow .floated-label .label-text {
        color: ${theme.A500};
        transition: color ${TRANSITION_FAST};
      }
    }

    sj-paper-button {
      color: ${theme.A500};
      transition: color ${TRANSITION_FAST};
    }

    .buttons {
      color: ${theme.A500};
      transition: color ${TRANSITION_FAST};
    }
  }

  /*  Dragging Songs Icon */
  .material-drag .song-drag-label {
    background: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Slider */
  paper-slider {
    paper-ripple.paper-slider {
      color: ${theme.A500} !important;
      transition: color ${TRANSITION_FAST};
    }
  }

  paper-slider #sliderKnob.paper-slider.style-scope > #sliderKnobInner.paper-slider.style-scope,
  paper-slider .slider-knob-inner.paper-slider {
    background-color: ${theme.A500} !important;
    border: 2px solid ${theme.A500} !important;
    transition: background ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};
  }

  paper-slider .ring.paper-slider > .slider-knob.paper-slider > .slider-knob-inner.paper-slider {
    background-color: ${theme.A500} !important;
    border-color: transparent;
    transition: background ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};
  }

  paper-progress #progressContainer #primaryProgress.paper-progress,
  paper-progress #progressContainer #primaryProgress {
    background-color: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  /*  Loading Progress */
  #current-loading-progress {
    background: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Loading Overlay */
  #loading-overlay paper-spinner-lite .circle,
  #loading-overlay paper-spinner-lite .spinner-layer.paper-spinner-lite {
    border-color: ${theme.A500};
    transition: border-color ${TRANSITION_FAST};
  }

  .primary-background:not([style-scope]):not(.style-scope) {
    background-color: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  paper-spinner .spinner-layer {
    border-color: ${theme.A500} !important;
    transition: border-color ${TRANSITION_FAST};
  }

  .upload-dialog {
    .upload-dialog-title {
      background: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }
  }

  .upload-dialog-dragover {
    border-color: ${theme.A500} !important;
    transition: border-color ${TRANSITION_FAST};

    &:not([style-scope]):not(.style-scope) {
      border-color: ${theme.A500} !important;
      transition: border-color ${TRANSITION_FAST};
    }

    .upload-dialog-description {
      color: ${theme.A500} !important;
      transition: color ${TRANSITION_FAST};
    }
  }

  .progress-bar-vertical,
  .progress-bar-horizontal {
    .progress-bar-thumb {
      background-color: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }
  }

  /*  Explicit */
  .album-view .material-container-details .info .title .explicit,
  .explicit,
  .material .song-row .explicit,
  .material-card .explicit,
  .podcast-series-view .material-container-details .info .title .explicit {
    background: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Sidebar Navigation */
  #nav .nav-section > a.nav-item-container,
  a.nav-item-container.tooltip:not([style-scope]):not(.style-scope) {
    &.selected {
      font-weight: 700;
      color: ${theme.A500};
      border-left: 2px solid ${theme.A500};
      transition: color ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};

      core-icon,
      iron-icon {
        color: ${theme.A500};
        transition: color ${TRANSITION_FAST};
      }
    }
  }

  gpm-quick-nav .items.gpm-quick-nav > [selected] {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  .solid-hero core-image#material-hero-image,
  .solid-hero iron-image#material-hero-image {
    background-color: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  .material-detail-view .material-container-details .read-more-button {
    color: ${theme.A500};
    transition: color ${TRANSITION_FAST};
  }

  /*  Page Play Button (Top Right) */
  .material-container-details paper-fab,
  .material-container-details sj-fab,
  .paper-fab-0,
  paper-fab {
    background: ${theme.A500};
    transition: background ${TRANSITION_FAST};

    &:hover,
    &.keyboard-focus {
      background: ${theme.A400};
    }
  }

  /*  Progress/Volume */
  #sliderBar::shadow #activeProgress,
  paper-slider::shadow #sliderBar::shadow #activeProgress,
  paper-slider::shadow #sliderKnobInner {
    background: ${theme.A500};
    transition: background ${TRANSITION_FAST};
  }

  /*  Various Music Buttons */
  #player.material #material-player-right-wrapper paper-icon-button[data-id='queue'].opened iron-icon,
  #player.material .material-player-middle paper-icon-button[data-id='repeat'].active iron-icon,
  #player.material .material-player-middle paper-icon-button[data-id='shuffle'].active iron-icon {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  #player.material sj-icon-button[data-id='cast']::shadow core-icon[aria-label='cast-connected'],
  #player.material sj-icon-button[data-id='cast']::shadow iron-icon[aria-label='cast-connected'] {
    color: ${theme.A500} !important;
    transition: color ${TRANSITION_FAST};
  }

  #player.material .material-player-middle paper-icon-button[data-id='play-pause']:not([disabled]) iron-icon,
  #player.material .material-player-middle sj-icon-button[data-id='play-pause']:not([disabled]) {
    color: ${theme.A500};
    transition: color ${TRANSITION_FAST};
  }

  sj-play-button #pulse.sj-play-button {
    background: ${theme.A500} !important;
    transition: background ${TRANSITION_FAST};
  }

  /*  Homepage Scrolling Module */
  sj-scrolling-module {
    .module-title-underline {
      background: ${theme.A500} !important;
      transition: background ${TRANSITION_FAST};
    }
  }

  /*  Page Indicator */
  #content-container {
    sj-page-indicator {
      .sj-page-tab.sj-page-indicator.iron-selected {
        iron-icon {
          color: ${theme.A500} !important;
          transition: color ${TRANSITION_FAST};
        }
      }
    }
  }

  /*  Top Charts Colors */
  .material-card .details .left-items .index,
  .top-charts-view .song-row [data-col='index'] .column-content:not([style-scope]):not(.style-scope),
  .top-charts-view .song-row [data-col='index'] .content {
    color: ${theme.A500};
    transition: color ${TRANSITION_FAST};
  }

  /*  Subscribe Icon */
  core-icon[icon='sj:subscribed'] svg,
  iron-icon[icon='sj:subscribed'] svg {
    path:nth-child(2) {
      fill: ${theme.A500};
    }

    path:nth-child(3) {
      stroke: ${theme.A500};
    }
  }

  /*  Queue Reorder Target Line */
  .dragging-target-line {
    border-top-color: ${theme.A500};
  }

  /* Secondary Toolbar Tabs Indicator */
  #selectionBar {
    border-color: ${theme.A500} !important;
    transition: border-color ${TRANSITION_FAST};
  }
`;

export default styles;
