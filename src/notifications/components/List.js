import React from 'react';
import styled from 'styled-components';

import Title from './Title';

const StyledList = styled.div`
  .List__title {
    margin: 0;
  }
`;

const List = ({ title, children }) => (
  <StyledList>
    <Title className="List__title">{title}</Title>
    <div className="List__content">{children}</div>
  </StyledList>
);

export default List;
