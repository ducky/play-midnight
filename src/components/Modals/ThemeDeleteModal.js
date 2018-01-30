import React from 'react';

import ModalWrapper from './ModalWrapper';
import ThemePreview from 'components/ThemePreview';

const ThemeDeleteModal = ({ ...props }) => {
  const name = props.details.name ? props.details.name : 'Anonymous';
  const { accent, background } = props.details;

  return (
    <ModalWrapper {...props} title={`Delete ${name}`} width={500}>
      <p>
        Whoa there, friend! You sure you wanna delete the lovely <strong>{name}</strong> theme?
      </p>
      <p style={{ marginBottom: 25 }}>
        This action{' '}
        <strong>
          <em>cannot</em>
        </strong>{' '}
        be undone, so just be sure about this.
      </p>
      <ThemePreview accent={accent} background={background} />
      <p>
        <small style={{ display: 'block', textAlign: 'center' }}>Take a second look. Beautiful, innit?</small>
      </p>
    </ModalWrapper>
  );
};

export default ThemeDeleteModal;
