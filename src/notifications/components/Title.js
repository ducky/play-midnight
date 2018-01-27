import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

const Title = styled.div`
  background: ${props => props.theme.B200};
  font-size: 16px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0 0 25px;
  border-bottom: 1px solid ${props => props.theme.B500};

  &:last-child {
    margin: 0;
  }
`;

export default withTheme(Title);
