import React from 'react';
import styled from 'styled-components';

import { TRANSITION_FAST } from 'style/theme';

const StyledLogo = styled.svg`
  width: 45px;
  height: 45px;
  fill: currentColor;
  transition: fill ${TRANSITION_FAST};
`;

const PlayMidnightLogo = props => (
  <StyledLogo focusable="false" viewBox="0 0 88.07 93.95" {...props}>
    <path d="M84.35,48.81c1.63-1,1.63-2.66,0-3.67L62,31.36c-1.63-1-3-.26-3,1.66V60.93c0,1.93,1.34,2.68,3,1.67Z" />
    <path d="M86.74,68.07a1.3,1.3,0,0,0-.87.34l-.06,0a28.25,28.25,0,1,1,0-43l.06.06a1.34,1.34,0,0,0,.87.33,1.32,1.32,0,0,0,1.33-1.32,1.55,1.55,0,0,0,0-.31l0-.08a1.18,1.18,0,0,0-.07-.2s0,0,0,0h0v0h0l-.15-.26a47,47,0,1,0,0,46.65L87.9,70h0a0,0,0,0,1,0,0,1.46,1.46,0,0,0,.07-.19l0-.09a1.55,1.55,0,0,0,0-.31A1.32,1.32,0,0,0,86.74,68.07Z" />
  </StyledLogo>
);

export default PlayMidnightLogo;
