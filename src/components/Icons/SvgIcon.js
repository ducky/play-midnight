import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  display: inline-flex;
  fill: currentColor;
  height: 24px;
  width: 24px;
`;

const SvgIcon = ({ children, viewBox, color, ...props }) => (
  <StyledSvg fill={color} focusable="false" viewBox={viewBox} {...props}>
    {children}
  </StyledSvg>
);

SvgIcon.defaultProps = {
  color: 'currentColor',
  viewBox: '0 0 24 24',
};

export default SvgIcon;
