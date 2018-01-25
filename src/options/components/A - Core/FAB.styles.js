import styled, { css } from 'styled-components';

import { TRANSITION_FAST } from 'style/theme';
import createStylesheet from 'utils/createStylesheet';

export const StyledFAB = styled.div`
  width: 40px;
  height: 40px;
  z-index: 108;
  margin: 4px;
  margin-right: 32px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  visibility: visible;
  opacity: 0.9;
  color: ${props => (props.useAccent ? props.theme.accent : props.theme.font_primary)};
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

  .FAB__icon {
    position: relative;
    width: 100%;
    height: 100%;
    fill: currentcolor;
    transition: fill ${TRANSITION_FAST};
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
