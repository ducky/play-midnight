import styled from 'styled-components';

const Text = styled.div`
  padding: 0 25px;
  margin: 0 0 25px;

  ${props => props.nopad && `padding: 0`};

  &:last-child {
    margin: 0;
  }
`;

export default Text;
