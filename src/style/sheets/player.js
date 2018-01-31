import { css } from 'styled-components';

import { TRANSITION_FAST } from 'style/theme';

const styles = theme => css`
  #player {
    background: ${theme.B300};
    color: ${theme.font_primary};
    transition: background ${TRANSITION_FAST};
  }

  #player.material .player-rating-container {
    background: ${theme.B300};
  }

  paper-slider #sliderBar #progressContainer {
    background: ${theme.B200} !important;
    transition: background ${TRANSITION_FAST};
  }

  #player.material:hover #material-player-progress #sliderContainer:not(.disabled) #sliderBar #progressContainer {
    background: ${theme.B100} !important;
  }

  #material-player-left-wrapper #playerSongInfo #player-artist,
  #material-player-left-wrapper #playerSongInfo .player-album,
  #material-player-left-wrapper #playerSongInfo .player-dash {
    color: ${theme.font_secondary};
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

  #player.material .material-player-middle paper-icon-button[data-id='play-pause'][title='Play'],
  #player.material .material-player-middle sj-icon-button[data-id='play-pause'][title='Play'] {
    path:nth-child(2) {
      fill: ${theme.B300};
    }
  }

  #player paper-icon-button[data-id='show-miniplayer'] {
    z-index: 1;
  }

  #time_container_current,
  #time_container_duration {
    color: ${theme.font_secondary};
  }

  #sliderKnob {
    display: none;
  }

  #player:hover #sliderKnob {
    display: block;
  }
`;

export default styles;
