import React from 'react';
import styled from 'styled-components';

import { isLight, FONT_LIGHT, FONT_DARK } from 'style/theme';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

const PrettyColor = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  background: ${props => props.background};
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  margin: 0 0 15px;
`;

const ThemePreview = ({ accent, background }) => (
  <PrettyColor background={background}>
    <Checkbox style={{ marginBottom: 10 }} accent={accent} background={background} defaultChecked={true} />
    <Button style={{ marginBottom: 10 }} accent={accent} background={background}>
      Such Button, Wow!
    </Button>
    <div style={{ color: isLight(background) ? FONT_LIGHT : FONT_DARK }}>Some Text!</div>
  </PrettyColor>
);

export default ThemePreview;
