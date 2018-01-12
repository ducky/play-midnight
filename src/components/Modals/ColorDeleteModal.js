import React from 'react';
import styled from 'styled-components';

import ModalWrapper from './ModalWrapper';

export const PrettyColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border-radius: 5px;
  background: ${props => props.color};
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19);
  margin: 25px 0 8px;

  strong {
    font-weight: 900;
  }

  &:before {
    content: '😎';
    font-size: 36px;
  }
`;

const ConfirmModal = ({ ...props }) => {
  const name = props.details.name ? props.details.name : props.details.color;

  return (
    <ModalWrapper {...props} title={`Delete ${name}`} width={500}>
      <p>
        Whoa there, friend! You sure you wanna delete the lovely <strong>{name}</strong> color?
      </p>
      <p>
        This action{' '}
        <strong>
          <em>cannot</em>
        </strong>{' '}
        be undone, so just be sure about this.
      </p>
      <PrettyColor color={props.details.color} />
      <p>
        <small style={{ display: 'block', textAlign: 'center' }}>Take a second look. Beautiful, innit?</small>
      </p>
    </ModalWrapper>
  );
};

export default ConfirmModal;
