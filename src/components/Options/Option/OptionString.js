import React from 'react';

import StyledOption from './Option.styled';

const Option = ({ title, children }) => (
  <StyledOption>
    <div className="Option__header">
      <div className="Option__content">
        <div className="Option__title">{title}</div>
        <div className="Option__description">{children}</div>
      </div>
    </div>
  </StyledOption>
);

export default Option;
