import React from 'react';
import find from 'lodash/find';

import Checkbox from 'components/Checkbox';
import StyledOption from './Option.styled';

const Option = ({ id, title, description, options, reliesOn, value: setValue, onTargetedChange }) => {
  let disabled = false;
  let value = setValue;

  if (reliesOn) {
    const reliedOption = find(options, { id: reliesOn });
    disabled = reliedOption && reliedOption.value === false;
    value = reliedOption ? (reliedOption.value === true ? value : false) : value;
  }

  return (
    <StyledOption>
      <div className="Option__header">
        <div className="Option__content">
          <div className="Option__title">{title}</div>
          <div className="Option__description">{description}</div>
        </div>
        <div className="Option__action">
          <Checkbox name={id} type="checkbox" disabled={disabled} checked={value} onChange={onTargetedChange} />
        </div>
      </div>
    </StyledOption>
  );
};

export default Option;
