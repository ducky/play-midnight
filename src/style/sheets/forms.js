import { css } from 'styled-components';

const styles = theme => css`
  /* Popup Dialog */
  paper-action-dialog {
    background: ${theme.B400};
    color: ${theme.font_primary};

    &::shadow h1 {
      color: ${theme.font_primary};
    }

    input {
      color: ${theme.font_secondary};
    }

    .unfocused-underline {
      background: ${theme.B500};
    }

    sj-paper-button {
      &[disabled] {
        background: ${theme.B500};
      }
    }
  }

  paper-input-container,
  .paper-input-container,
  .paper-input-container-1 {
    .input-content.paper-input-container .paper-input-input,
    .input-content.paper-input-container input,
    .input-content.paper-input-container iron-autogrow-textarea,
    .input-content.paper-input-container textarea {
      color: ${theme.font_primary};
    }
  }

  .material-share-options #sharing-option-label {
    color: ${theme.font_primary};
  }

  .error,
  .label-text,
  .material-share-options #sharing-option-description {
    color: ${theme.font_secondary};
  }
`;

export default styles;
