import { css } from 'styled-components';

const styles = theme => css`
  /* Radio Button */
  paper-button .toggle-bar.paper-toggle-button {
    background-color: ${theme.B500};
  }

  paper-button .paper-toggle-button.paper-toggle-button {
    background-color: ${theme.font_primary};
  }

  /* Checkbox */
  paper-checkbox #checkboxLabel.paper-checkbox {
    color: ${theme.font_primary};
  }

  /* Buttons */
  .button.primary,
  .simple-dialog-buttons button.goog-buttonset-default,
  paper-button,
  paper-button.material-primary,
  sj-paper-button.material-primary {
    opacity: 0.9;

    &[disabled] {
      background: ${theme.B500};
      color: ${theme.font_secondary};
      cursor: not-allowed;
    }

    &:hover {
      opacity: 1;
    }
  }

  /* Top Colored Bar icons */
  core-header-panel#content-container core-icon,
  core-header-panel#content-container sj-icon-button {
    color: ${theme.font_primary} !important;
  }

  /* Playlist button */
  #unsubscribe-playlist-button,
  paper-button#unsubscribe-playlist-button sj-paper-button#unsubscribe-playlist-button {
    .playlist-unsubscribe {
      color: ${theme.font_primary};
    }
  }

  /* Play Button */
  sj-play-button #pulse.sj-play-button {
    opacity: 0.3;
  }
`;

export default styles;
