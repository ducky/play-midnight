import styled from 'styled-components';

// import { colors } from 'theme/theme';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 8;
  padding: 100px;
  overflow: auto;
  background: rgba(0, 0, 0, 0.7);

  &.modal-enter {
    opacity: 0.01;
  }

  &.modal-enter.modal-enter-active {
    opacity: 1;
    transition: opacity 0.3s;
  }

  &.modal-leave {
    opacity: 1;
  }

  &.modal-leave.modal-leave-active {
    opacity: 0.01;
    transition: opacity 0.2s;
  }
`;

/*${colors.white};*/
/* ${props =>
    props.type === 'info' && `border-top: 10px solid ${colors.grayHoki}`};
  ${props =>
    props.type === 'success' && `border-top: 10px solid ${colors.greenSushi}`};
  ${props =>
    props.type === 'alert' && `border-top: 10px solid ${colors.redPersian}`}; */

const Modal = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 36px;
  max-width: 1024px;
  margin: 0 auto;
  transform-origin: top center;

  .Modal__header {
    font-size: 18px;
    margin: 0 0 25px;
  }

  .Modal__content {
    font-size: 15px;
    margin: 0 0 36px;

    ul {
      line-height: 1.5;
    }
  }

  .modal-enter & {
    transform: scale(0.9);
    opacity: 0.01;
  }

  .modal-enter.modal-enter-active & {
    transform: scale(1);
    opacity: 1;
    transition: transform 300ms, opacity 300ms;
  }

  .modal-leave & {
    transform: scale(1);
    opacity: 0.1;
  }

  .modal-leave.modal-leave-active & {
    transform: scale(0.7);
    opacity: 0.01;
    transition: transform 200ms, opacity 200ms;
  }
`;

export const ModalActions = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.length || 2}, 1fr);
  grid-gap: 0 6px;
`;

export default Modal;
