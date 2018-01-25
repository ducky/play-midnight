import { css } from 'styled-components';

const styles = theme => css`
  #player {
    background: ${theme.B300};
    color: ${theme.font_primary};
  }

  #player.material .player-rating-container {
    background: ${theme.B300};
  }

  #player.material:hover #material-player-progress #sliderContainer:not(.disabled) #sliderBar #progressContainer,
  #player.material:hover
    #material-player-progress::shadow
    #sliderContainer:not(.disabled)
    #sliderBar::shadow
    #progressContainer {
    background: ${theme.B100};
  }

  #material-player-left-wrapper #playerSongInfo #player-artist,
  #material-player-left-wrapper #playerSongInfo .player-album,
  #material-player-left-wrapper #playerSongInfo .player-dash {
    color: ${theme.font_secondary};
  }

  paper-slider #sliderBar #progressContainer {
    background: ${theme.B200};
  }

  paper-slider .ring > #sliderKnob > #sliderKnobInner {
    background: ${theme.B300};
    border: 2px solid ${theme.B200};
  }

  #player.material .material-player-middle paper-icon-button[data-id='play-pause'][disabled],
  #player.material .material-player-middle sj-icon-button[data-id='play-pause'][disabled] {
    opacity: 0.35 !important;
    cursor: not-allowed !important;
  }

  #player.material .material-player-middle paper-icon-button[data-id='play-pause'] iron-icon,
  #player.material .material-player-middle sj-icon-button[data-id='play-pause']::shadow core-icon {
    g {
      path:nth-child(2) {
        fill: ${theme.B300};
      }
    }
  }

  #player paper-icon-button[data-id='show-miniplayer'] {
    z-index: 1;
  }
`;

export default styles;
