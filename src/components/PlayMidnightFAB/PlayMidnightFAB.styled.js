import styled from 'styled-components';

const StyledFAB = styled.div`
  position: fixed;
  bottom: 105px;
  right: 24px;
  width: 50px;
  height: 50px;
  z-index: 108;
  padding: 12px;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transition: all 0.3s;
  visibility: visible;
  opacity: 0.9;

  background: #ed6237;
  border-radius: 50%;

  &:hover {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  &:active,
  &:focus {
    opacity: 0.8;
    transform: scale3d(0.95, 0.95, 0.95);
  }

  .FAB__icon {
    position: relative;
    width: 100%;
    height: 100%;
    color: #141517;
    fill: currentcolor;
  }
`;

export default StyledFAB;
