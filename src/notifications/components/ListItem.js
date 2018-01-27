import React from 'react';
import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

const StyledListItem = withTheme(styled.div`
  padding: 15px 25px;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.B500};

  .ListItem__title {
    font-weight: 700;
    margin: 0 0 5px;
  }

  &:last-child {
    border: none;
  }
`);

const ListItem = ({ title, children }) => (
  <StyledListItem>
    <div className="ListItem__title">{title}</div>
    <div className="ListItem__text">{children}</div>
  </StyledListItem>
);

export default ListItem;
