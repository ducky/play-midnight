import { css } from 'styled-components';

const styles = theme => css`
  html:not([style-scope]):not(.style-scope) {
    --default-primary-color: ${theme.accent};
    --primary-color: ${theme.accent};
  }

  /*  Scrollbar */
  ::-webkit-scrollbar-thumb,
  ::shadow ::-webkit-scrollbar-thumb {
    background-color: ${theme.accent};
  }

  .primary:not([style-scope]):not(.style-scope) {
    color: ${theme.accent} !important;
  }

  /*  Uploading Music */
  .material-transfer-radial-download-overlay,
  .material-transfer-radial-processing-overlay,
  .material-transfer-radial-upload-overlay {
    background: ${theme.accent};
  }

  /*  Menu Selected */
  .goog-menu .goog-menuitem.selected .goog-menuitem-content:not([style-scope]):not(.style-scope) {
    color: ${theme.accent} !important;

    &:hover {
      color: ${theme.accent} !important;
    }
  }

  /*  Chevron Icons */
  .cluster.material-cluster .lane-button core-icon,
  .cluster.material-cluster .lane-button iron-icon {
    color: ${theme.accent};
  }

  /*  Toggle Button */
  paper-toggle-button::shadow [checked] {
    .toggle {
      background: ${theme.accent};
    }

    .toggle-ink {
      color: ${theme.accent};
    }
  }

  paper-toggle-button[checked]:not([disabled]) {
    .toggle-bar.paper-toggle-button,
    .toggle-button.paper-toggle-button {
      background-color: ${theme.accent};
    }

    .toggle-ink.paper-toggle-button {
      color: ${theme.accent};
    }
  }

  /*  Checkbox */
  paper-checkbox::shadow {
    #checkbox.checked {
      background-color: ${theme.accent};
      border-color: ${theme.accent};
    }

    #ink[checked] {
      color: ${theme.accent};
    }
  }

  paper-checkbox {
    #ink[checked],
    #ink[checked].paper-checkbox {
      color: ${theme.accent};
    }

    #checkbox.checked,
    #checkbox.checked.paper-checkbox {
      background-color: ${theme.accent};
      border-color: ${theme.accent};
    }
  }

  /*  Buttons */
  .button.primary,
  .simple-dialog-buttons button.goog-buttonset-default,
  paper-button.material-primary,
  paper-button.material-primary:not([raised])[focused],
  sj-paper-button.material-primary {
    background: ${theme.accent};
    color: #fff;

    &:hover {
      background: ${theme.accent} !important;
    }
  }

  .info-card:not([style-scope]):not(.style-scope):not(.szsb-card):not(.add-your-music) paper-button,
  .top-charts-view .song-row [data-col='index'] .column-content:not([style-scope]):not(.style-scope),
  .upload-dialog-dragover .upload-dialog-description:not([style-scope]):not(.style-scope),
  .ups.light iron-icon:not([style-scope]):not(.style-scope),
  paper-dialog .buttons paper-button:not([style-scope]):not(.style-scope):not([disabled]),
  paper-toast paper-button[data-action='button']:not([style-scope]):not(.style-scope) {
    color: ${theme.accent};
  }

  paper-action-dialog sj-paper-button,
  paper-dialog .buttons paper-button:not([style-scope]):not(.style-scope):not([disabled]) {
    color: ${theme.accent};
  }

  #music-content .material-banner.banner.new-user-quiz-card sj-paper-button,
  #music-content .material-banner.banner.ws-search-banner sj-paper-button,
  #music-content .material-banner.banner.ws-subscriber-card sj-paper-button {
    color: ${theme.accent};
  }

  .more-songs-container.primary > paper-button {
    color: ${theme.accent};
  }

  paper-toast [data-action='button'],
  paper-toast div[data-action='button'] {
    color: ${theme.accent};
  }

  sj-callout {
    background: ${theme.accent} !important;
  }

  paper-icon-button.sj-callout-target:not([style-scope]):not(.style-scope) {
    background-color: ${theme.accent} !important;
  }

  gpm-bottom-sheet {
    #buttonRow {
      paper-button {
        background-color: ${theme.accent} !important;

        span {
          color: $font_primary !important;
        }

        &:first-child {
          background-color: transparent !important;

          span {
            color: ${theme.accent} !important;
          }
        }
      }
    }
  }

  sj-play-button #buttonContent.sj-play-button {
    background-color: ${theme.accent};
  }

  /*  Playlist button */
  #unsubscribe-playlist-button,
  sj-paper-button#unsubscribe-playlist-button {
    .icon[icon='add-circle'],
    .playlist-subscribed {
      color: ${theme.accent};
    }
  }

  .sj-play-button-0 #buttonContent.sj-play-button {
    background: ${theme.accent};
  }

  .sj-play-button-0 #pulse.sj-play-button {
    background: ${theme.accent};
    opacity: 0.3;
  }

  /*  Links */
  .music-source-empty-message,
  .nav-item-container,
  .simple-dialog a,
  a {
    &.primary,
    &.primary:not([style-scope]):not(.style-scope) {
      color: ${theme.accent};
    }
  }

  /*  Top Toolbar */
  #nav-container #music-content.material .material-cover {
    background-color: ${theme.accent};
  }

  /*  Inputs */
  paper-input-container,
  paper-input-decorator {
    &::shadow .focused-underline {
      background: ${theme.accent};
    }

    &[focused]::shadow .floated-label .label-text {
      color: ${theme.accent};
    }

    .focused-line.paper-input-container {
      background: ${theme.accent};
    }

    .add-on-content.is-highlighted.paper-input-container *,
    .input-content.label-is-floating.paper-input-container label,
    .input-content.label-is-floating.paper-input-container .paper-input-label,
    .input-content.label-is-highlighted.paper-input-container .paper-input-label,
    .input-content.label-is-highlighted.paper-input-container label {
      color: ${theme.accent};
    }
  }

  /*  Popup Dialog */
  paper-dialog,
  paper-action-dialog {
    paper-input-decorator {
      &::shadow .focused-underline {
        background: ${theme.accent};
      }

      &[focused]::shadow .floated-label .label-text {
        color: ${theme.accent};
      }
    }

    sj-paper-button {
      color: ${theme.accent};
    }

    .buttons {
      color: ${theme.accent};
    }
  }

  /*  Dragging Songs Icon */
  .material-drag .song-drag-label {
    background: ${theme.accent};
  }

  /*  Slider */
  paper-slider {
    paper-ripple.paper-slider {
      color: ${theme.accent};
    }
  }

  paper-slider #sliderKnob.paper-slider.style-scope > #sliderKnobInner.paper-slider.style-scope,
  paper-slider .slider-knob-inner.paper-slider {
    background-color: ${theme.accent};
    border: 2px solid ${theme.accent};
  }

  paper-slider .ring.paper-slider > .slider-knob.paper-slider > .slider-knob-inner.paper-slider {
    background-color: ${theme.accent};
    border-color: transparent;
  }

  paper-progress #primaryProgress.paper-progress {
    background-color: ${theme.accent};
  }

  /*  Loading Progress */
  #current-loading-progress {
    background: ${theme.accent};
  }

  /*  Loading Overlay */
  #loading-overlay paper-spinner-lite .circle,
  #loading-overlay paper-spinner-lite .spinner-layer.paper-spinner-lite {
    border-color: ${theme.accent};
  }

  .primary-background:not([style-scope]):not(.style-scope) {
    background-color: ${theme.accent} !important;
  }

  paper-spinner .spinner-layer {
    border-color: ${theme.accent} !important;
  }

  .upload-dialog {
    .upload-dialog-title {
      background: ${theme.accent};
    }
  }

  .upload-dialog-dragover {
    border-color: ${theme.accent} !important;

    &:not([style-scope]):not(.style-scope) {
      border-color: ${theme.accent} !important;
    }

    .upload-dialog-description {
      color: ${theme.accent} !important;
    }
  }

  .progress-bar-vertical,
  .progress-bar-horizontal {
    .progress-bar-thumb {
      background-color: ${theme.accent} !important;
    }
  }

  /*  Explicit */
  .album-view .material-container-details .info .title .explicit,
  .explicit,
  .material .song-row .explicit,
  .material-card .explicit,
  .podcast-series-view .material-container-details .info .title .explicit {
    background: ${theme.accent};
  }

  /*  Sidebar Navigation */
  #nav .nav-section > a.nav-item-container,
  a.nav-item-container.tooltip:not([style-scope]):not(.style-scope) {
    &.selected {
      font-weight: 700;
      color: ${theme.accent};
      border-left: 2px solid ${theme.accent};

      core-icon,
      iron-icon {
        color: ${theme.accent};
      }
    }
  }

  .solid-hero core-image#material-hero-image,
  .solid-hero iron-image#material-hero-image {
    background-color: ${theme.accent} !important;
  }

  .material-detail-view .material-container-details .read-more-button {
    color: ${theme.accent};
  }

  /*  Page Play Button (Top Right) */
  .material-container-details paper-fab,
  .material-container-details sj-fab,
  .paper-fab-0,
  paper-fab {
    background: ${theme.accent};
  }

  /*  Progress/Volume */
  #sliderBar::shadow #activeProgress,
  paper-slider::shadow #sliderBar::shadow #activeProgress,
  paper-slider::shadow #sliderKnobInner {
    background: ${theme.accent};
  }

  /*  Various Music Buttons */
  #player.material #material-player-right-wrapper paper-icon-button[data-id='queue'].opened iron-icon,
  #player.material .material-player-middle paper-icon-button[data-id='repeat'].active iron-icon,
  #player.material .material-player-middle paper-icon-button[data-id='shuffle'].active iron-icon {
    color: ${theme.accent} !important;
  }

  #player.material sj-icon-button[data-id='cast']::shadow core-icon[aria-label='cast-connected'],
  #player.material sj-icon-button[data-id='cast']::shadow iron-icon[aria-label='cast-connected'] {
    color: ${theme.accent} !important;
  }

  #player.material .material-player-middle paper-icon-button[data-id='play-pause']:not([disabled]) iron-icon,
  #player.material .material-player-middle sj-icon-button[data-id='play-pause']:not([disabled]) {
    color: ${theme.accent};
  }

  sj-play-button #pulse.sj-play-button {
    background: ${theme.accent} !important;
  }

  /*  Homepage Scrolling Module */
  sj-scrolling-module {
    .module-title-underline {
      background: ${theme.accent} !important;
    }
  }

  /*  Page Indicator */
  #content-container {
    sj-page-indicator {
      .sj-page-tab.sj-page-indicator.iron-selected {
        iron-icon {
          color: ${theme.accent} !important;
        }
      }
    }
  }

  /*  Top Charts Colors */
  .material-card .details .left-items .index,
  .top-charts-view .song-row [data-col='index'] .column-content:not([style-scope]):not(.style-scope),
  .top-charts-view .song-row [data-col='index'] .content {
    color: ${theme.accent};
  }

  /*  Subscribe Icon */
  core-icon[icon='sj:subscribed'] svg,
  iron-icon[icon='sj:subscribed'] svg {
    path:nth-child(2) {
      fill: ${theme.accent};
    }

    path:nth-child(3) {
      stroke: ${theme.accent};
    }
  }

  /*  Queue Reorder Target Line */
  .dragging-target-line {
    border-top-color: ${theme.accent};
  }
`;

export default styles;
