import React from 'react';
import styled from 'styled-components';

import { isLight, FONT_LIGHT, FONT_DARK } from 'style/theme';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import ModalWrapper from './ModalWrapper';

export const PrettyTheme = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 125px;
  border-radius: 5px;
  background: ${props => props.background};
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  margin: 25px 0 15px;

  strong {
    font-weight: 900;
  }
`;

const ThemeDeleteModal = ({ ...props }) => {
  const name = props.details.name ? props.details.name : 'Anonymous';

  return (
    <ModalWrapper {...props} title={`Delete ${name}`} width={500}>
      <p>
        Whoa there, friend! You sure you wanna delete the lovely <strong>{name}</strong> theme?
      </p>
      <p>
        This action{' '}
        <strong>
          <em>cannot</em>
        </strong>{' '}
        be undone, so just be sure about this.
      </p>
      <PrettyTheme background={props.details.background}>
        <Checkbox style={{ marginBottom: 10 }} background={props.details.accent} />
        <Button style={{ marginBottom: 10 }} background={props.details.accent}>
          Such Button, Wow!
        </Button>
        <div style={{ color: isLight(props.details.background) ? FONT_LIGHT : FONT_DARK }}>Some Text!</div>
      </PrettyTheme>
      <p>
        <small style={{ display: 'block', textAlign: 'center' }}>Take a second look. Beautiful, innit?</small>
      </p>
    </ModalWrapper>
  );
};

export default ThemeDeleteModal;
