import React from 'react';
import styled from 'styled-components';

import ModalWrapper from './ModalWrapper';

export const PrettyTheme = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border-radius: 5px;
  background: ${props => props.background};
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  margin: 25px 0 15px;

  strong {
    font-weight: 900;
  }

  &:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 5px;
    overflow: hidden;
    background: ${props => props.accent || 'transparent'};
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  }

  &:after {
    position: relative;
    z-index: 1;
    content: '😎';
    font-size: 36px;
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
      <PrettyTheme accent={props.details.accent} background={props.details.background} />
      <p>
        <small style={{ display: 'block', textAlign: 'center' }}>Take a second look. Beautiful, innit?</small>
      </p>
    </ModalWrapper>
  );
};

export default ThemeDeleteModal;
