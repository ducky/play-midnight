import React from 'react';

import Checkbox from 'components/Checkbox';
import StyledOption from './Option.styled';

const Option = ({ id, title, description, value, onTargetedChange }) => (
  <StyledOption>
    <div className="Option__header">
      <div className="Option__content">
        <div className="Option__title">{title}</div>
        <div className="Option__description">{description}</div>
      </div>
      <div className="Option__action">
        <Checkbox
          name={id}
          type="checkbox"
          checked={value}
          onChange={onTargetedChange}
        />
      </div>
    </div>
  </StyledOption>
);

export default Option;
