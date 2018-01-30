import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.span || 1}, 1fr);
  grid-gap: 25px;
`;

export default Grid;
