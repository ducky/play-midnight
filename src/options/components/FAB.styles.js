import styled, { css } from 'styled-components';

import { TRANSITION_FAST } from 'style/theme';
import createStylesheet from 'utils/createStylesheet';

export const StyledFAB = styled.div`
  display: inline-flex;
  margin: 4px;
  margin-right: 32px;
  padding: 8px;
  cursor: pointer;
  visibility: visible;
  opacity: 0.9;
  color: ${props =>
    props.useAccent ? props.theme.A500 : props.enabled ? props.theme.font_primary : props.theme.font_google};
  border-radius: 50%;
  transition: color ${TRANSITION_FAST}, opacity ${TRANSITION_FAST}, transform ${TRANSITION_FAST};

  &:hover {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  &:active,
  &:focus {
    opacity: 0.8;
    transform: scale3d(0.95, 0.95, 0.95);
  }
`;

const styles = theme => css`
  #player #material-player-right-wrapper paper-icon-button[data-id='queue'] {
    margin: 8px;
  }

  #queue-overlay:after {
    right: 72px;
  }
`;

export default createStylesheet(styles);
