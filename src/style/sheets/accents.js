import { css } from 'styled-components';

import { colors } from 'style/theme';

const styles = accentColor => css`
  html:not([style-scope]):not(.style-scope) {
    --default-primary-color: ${accentColor};
    --primary-color: ${accentColor};
  }

  /*  Scrollbar */
  ::-webkit-scrollbar-thumb,
  ::shadow ::-webkit-scrollbar-thumb {
    background-color: ${accentColor};
  }

  .primary:not([style-scope]):not(.style-scope) {
    color: ${accentColor} !important;
  }

  /*  Logo */
  #material-app-bar #material-one-left {
    /*  TODO - Update logo in future */
    .music-logo-link {
      display: none !important;
    }
  }

  /*  Uploading Music */
  .material-transfer-radial-download-overlay,
  .material-transfer-radial-processing-overlay,
  .material-transfer-radial-upload-overlay {
    background: ${accentColor};
  }

  /*  Menu Selected */
  .goog-menu .goog-menuitem.selected .goog-menuitem-content:not([style-scope]):not(.style-scope) {
    color: ${accentColor} !important;

    &:hover {
      color: ${accentColor} !important;
    }
  }

  /*  Chevron Icons */
  .cluster.material-cluster .lane-button core-icon,
  .cluster.material-cluster .lane-button iron-icon {
    color: ${accentColor};
  }

  /*  Toggle Button */
  paper-toggle-button::shadow [checked] {
    .toggle {
      background: ${accentColor};
    }

    .toggle-ink {
      color: ${accentColor};
    }
  }

  paper-toggle-button[checked]:not([disabled]) {
    .toggle-bar.paper-toggle-button,
    .toggle-button.paper-toggle-button {
      background-color: ${accentColor};
    }

    .toggle-ink.paper-toggle-button {
      color: ${accentColor};
    }
  }

  /*  Checkbox */
  paper-checkbox::shadow {
    #checkbox.checked {
      background-color: ${accentColor};
      border-color: ${accentColor};
    }

    #ink[checked] {
      color: ${accentColor};
    }
  }

  paper-checkbox {
    #ink[checked],
    #ink[checked].paper-checkbox {
      color: ${accentColor};
    }

    #checkbox.checked,
    #checkbox.checked.paper-checkbox {
      background-color: ${accentColor};
      border-color: ${accentColor};
    }
  }

  /*  Buttons */
  .button.primary,
  .simple-dialog-buttons button.goog-buttonset-default,
  paper-button.material-primary,
  paper-button.material-primary:not([raised])[focused],
  sj-paper-button.material-primary {
    background: ${accentColor};
    color: #fff;

    &:hover {
      background: ${accentColor} !important;
    }
  }

  .info-card:not([style-scope]):not(.style-scope):not(.szsb-card):not(.add-your-music) paper-button,
  .top-charts-view .song-row [data-col='index'] .column-content:not([style-scope]):not(.style-scope),
  .upload-dialog-dragover .upload-dialog-description:not([style-scope]):not(.style-scope),
  .ups.light iron-icon:not([style-scope]):not(.style-scope),
  paper-dialog .buttons paper-button:not([style-scope]):not(.style-scope):not([disabled]),
  paper-toast paper-button[data-action='button']:not([style-scope]):not(.style-scope) {
    color: ${accentColor};
  }

  paper-action-dialog sj-paper-button,
  paper-dialog .buttons paper-button:not([style-scope]):not(.style-scope):not([disabled]) {
    color: ${accentColor};
  }

  #music-content .material-banner.banner.new-user-quiz-card sj-paper-button,
  #music-content .material-banner.banner.ws-search-banner sj-paper-button,
  #music-content .material-banner.banner.ws-subscriber-card sj-paper-button {
    color: ${accentColor};
  }

  .more-songs-container.primary > paper-button {
    color: ${accentColor};
  }

  paper-toast [data-action='button'],
  paper-toast div[data-action='button'] {
    color: ${accentColor};
  }

  sj-callout {
    background: ${accentColor} !important;
  }

  paper-icon-button.sj-callout-target:not([style-scope]):not(.style-scope) {
    background-color: ${accentColor} !important;
  }

  gpm-bottom-sheet {
    #buttonRow {
      paper-button {
        background-color: ${accentColor} !important;

        span {
          color: $font_primary !important;
        }

        &:first-child {
          background-color: transparent !important;

          span {
            color: ${accentColor} !important;
          }
        }
      }
    }
  }

  sj-play-button #buttonContent.sj-play-button {
    background-color: ${accentColor};
  }

  /*  Playlist button */
  #unsubscribe-playlist-button,
  sj-paper-button#unsubscribe-playlist-button {
    .icon[icon='add-circle'],
    .playlist-subscribed {
      color: ${accentColor};
    }
  }

  .sj-play-button-0 #buttonContent.sj-play-button {
    background: ${accentColor};
  }

  .sj-play-button-0 #pulse.sj-play-button {
    background: ${accentColor};
    opacity: 0.3;
  }

  /*  Links */
  .music-source-empty-message,
  .nav-item-container,
  .simple-dialog a,
  a {
    &.primary,
    &.primary:not([style-scope]):not(.style-scope) {
      color: ${accentColor};
    }
  }

  /*  Top Toolbar */
  #nav-container #music-content.material .material-cover {
    background-color: ${accentColor};
  }

  /*  Logo */
  .new-playlist-drawer #nav-container .nav-toolbar .menu-logo {
    display: block;
    box-sizing: border-box;
    width: 170px;
    height: 60px;
    padding-left: 170px;
    background: ${accentColor} url('{CHROME_DIR}/images/play_music_logo_light.png') no-repeat center center;
    background-size: 170px auto;
  }

  /*  Inputs */
  paper-input-container,
  paper-input-decorator {
    &::shadow .focused-underline {
      background: ${accentColor};
    }

    &[focused]::shadow .floated-label .label-text {
      color: ${accentColor};
    }

    .focused-line.paper-input-container {
      background: ${accentColor};
    }

    .add-on-content.is-highlighted.paper-input-container *,
    .input-content.label-is-floating.paper-input-container label,
    .input-content.label-is-floating.paper-input-container .paper-input-label,
    .input-content.label-is-highlighted.paper-input-container .paper-input-label,
    .input-content.label-is-highlighted.paper-input-container label {
      color: ${accentColor};
    }
  }

  /*  Popup Dialog */
  paper-dialog,
  paper-action-dialog {
    paper-input-decorator {
      &::shadow .focused-underline {
        background: ${accentColor};
      }

      &[focused]::shadow .floated-label .label-text {
        color: ${accentColor};
      }
    }

    sj-paper-button {
      color: ${accentColor};
    }

    .buttons {
      color: ${accentColor};
    }
  }

  /*  Dragging Songs Icon */
  .material-drag .song-drag-label {
    background: ${accentColor};
  }

  /*  Slider */
  paper-slider {
    paper-ripple.paper-slider {
      color: ${accentColor};
    }
  }

  paper-slider #sliderKnob.paper-slider.style-scope > #sliderKnobInner.paper-slider.style-scope,
  paper-slider .slider-knob-inner.paper-slider {
    background-color: ${accentColor};
    border: 2px solid ${accentColor};
  }

  paper-slider .ring.paper-slider > .slider-knob.paper-slider > .slider-knob-inner.paper-slider {
    background-color: ${accentColor};
    border-color: transparent;
  }

  paper-progress #primaryProgress.paper-progress {
    background-color: ${accentColor};
  }

  /*  Loading Progress */
  #current-loading-progress {
    background: ${accentColor};
  }

  /*  Loading Overlay */
  #loading-overlay paper-spinner-lite .circle,
  #loading-overlay paper-spinner-lite .spinner-layer.paper-spinner-lite {
    border-color: ${accentColor};
  }

  .primary-background:not([style-scope]):not(.style-scope) {
    background-color: ${accentColor} !important;
  }

  paper-spinner .spinner-layer {
    border-color: ${accentColor} !important;
  }

  .upload-dialog {
    .upload-dialog-title {
      background: ${accentColor};
    }
  }

  .upload-dialog-dragover {
    border-color: ${accentColor} !important;

    &:not([style-scope]):not(.style-scope) {
      border-color: ${accentColor} !important;
    }

    .upload-dialog-description {
      color: ${accentColor} !important;
    }
  }

  .progress-bar-vertical,
  .progress-bar-horizontal {
    .progress-bar-thumb {
      background-color: ${accentColor} !important;
    }
  }

  /*  Explicit */
  .album-view .material-container-details .info .title .explicit,
  .explicit,
  .material .song-row .explicit,
  .material-card .explicit,
  .podcast-series-view .material-container-details .info .title .explicit {
    background: ${accentColor};
  }

  /*  Sidebar Navigation */
  #nav .nav-section > a.nav-item-container,
  a.nav-item-container.tooltip:not([style-scope]):not(.style-scope) {
    &.selected {
      font-weight: 700;
      color: ${accentColor};
      border-left: 2px solid ${accentColor};

      core-icon,
      iron-icon {
        color: ${accentColor};
      }
    }
  }

  .solid-hero core-image#material-hero-image,
  .solid-hero iron-image#material-hero-image {
    background-color: ${accentColor} !important;
  }

  .material-detail-view .material-container-details .read-more-button {
    color: ${accentColor};
  }

  /*  Page Play Button (Top Right) */
  .material-container-details paper-fab,
  .material-container-details sj-fab,
  .paper-fab-0,
  paper-fab {
    background: ${accentColor};
  }

  /*  Progress/Volume */
  #sliderBar::shadow #activeProgress,
  paper-slider::shadow #sliderBar::shadow #activeProgress,
  paper-slider::shadow #sliderKnobInner {
    background: ${accentColor};
  }

  /*  Various Music Buttons */
  #player.material #material-player-right-wrapper paper-icon-button[data-id='queue'].opened iron-icon,
  #player.material .material-player-middle paper-icon-button[data-id='repeat'].active iron-icon,
  #player.material .material-player-middle paper-icon-button[data-id='shuffle'].active iron-icon {
    color: ${accentColor} !important;
  }

  #player.material sj-icon-button[data-id='cast']::shadow core-icon[aria-label='cast-connected'],
  #player.material sj-icon-button[data-id='cast']::shadow iron-icon[aria-label='cast-connected'] {
    color: ${accentColor} !important;
  }

  #player.material .material-player-middle paper-icon-button[data-id='play-pause']:not([disabled]) iron-icon,
  #player.material .material-player-middle sj-icon-button[data-id='play-pause']:not([disabled]) {
    color: ${accentColor};
  }

  sj-play-button #pulse.sj-play-button {
    background: ${accentColor} !important;
  }

  /*  Homepage Scrolling Module */
  sj-scrolling-module {
    .module-title-underline {
      background: ${accentColor} !important;
    }
  }

  /*  Page Indicator */
  #content-container {
    sj-page-indicator {
      .sj-page-tab.sj-page-indicator.iron-selected {
        iron-icon {
          color: ${accentColor} !important;
        }
      }
    }
  }

  /*  Top Charts Colors */
  .material-card .details .left-items .index,
  .top-charts-view .song-row [data-col='index'] .column-content:not([style-scope]):not(.style-scope),
  .top-charts-view .song-row [data-col='index'] .content {
    color: ${accentColor};
  }

  /*  Subscribe Icon */
  core-icon[icon='sj:subscribed'] svg,
  iron-icon[icon='sj:subscribed'] svg {
    path:nth-child(2) {
      fill: ${accentColor};
    }

    path:nth-child(3) {
      stroke: ${accentColor};
    }
  }

  /*  Queue Reorder Target Line */
  .dragging-target-line {
    border-top-color: ${accentColor};
  }
`;

export default styles;
