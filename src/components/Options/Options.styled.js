import styled from 'styled-components';

import { TRANSITION_FAST } from 'style/theme';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 109;
`;

const StyledOptions = styled.div`
  display: flex;
  flex-flow: column;
  position: fixed;
  left: calc(50vw - 300px);
  bottom: 118px;
  width: 600px;
  height: calc(100vh - 110px - 137px);
  min-height: 360px;
  max-height: 750px;
  z-index: 110;
  border-radius: 3px;
  color: ${props => props.theme.font_primary};
  background: ${props => props.theme.B300};
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.4);
  transform-origin: center bottom 0;
  transition: background ${TRANSITION_FAST}, color ${TRANSITION_FAST};

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    box-sizing: border-box;
    left: calc(100% / 2 - 8px);
    bottom: -8px;
    transform-origin: 50% 50%;
    transform: rotate(-45deg);
    border: 8px solid transparent;
    border-color: ${props => `transparent transparent ${props.theme.B400} ${props.theme.B400}`};
    box-shadow: -12px 12px 15px 0px rgba(0, 0, 0, 0.24);
    transition: border-color ${TRANSITION_FAST};
  }

  .animate-enter & {
    transform: scale(0.2);
    opacity: 0.01;
  }

  .animate-enter.animate-enter-active & {
    transform: scale(1);
    opacity: 1;
    transition: transform ${props => props.transitionEnter}, opacity ${props => props.transitionEnter};
  }

  .animate-leave & {
    transform: scale(1);
    opacity: 1;
  }

  .animate-leave.animate-leave-active & {
    transform: scale(0.2);
    opacity: 0.01;
    transition: transform ${props => props.transitionLeave}, opacity ${props => props.transitionLeave};
  }

  .Options__header {
    position: relative;
    text-align: center;
    flex: 0 0 auto;
    border-radius: 3px 3px 0 0;
    background: ${props => props.theme.B400};
    border-bottom: 1px solid ${props => props.theme.B600};
    padding: 15px 25px;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.3);
    z-index: 1;
    transition: background ${TRANSITION_FAST}, color ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};

    .Options__header-title {
      font-weight: 300;
      font-size: 28px;
      margin: 0 0 5px;

      span {
        font-weight: 100;
      }
    }

    .Options__header-version {
      font-size: 10px;
      font-weight: 700;
    }
  }

  .Options__options {
    position: relative;
    flex: 1 1 auto;
    overflow: hidden;

    .Options__options-container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
    }
  }

  .Options__footer {
    position: relative;
    flex: 0 0 auto;
    border-radius: 0 0 3px 3px;
    background: ${props => props.theme.B400};
    border-top: 1px solid ${props => props.theme.B500};
    box-shadow: 0 -5px 25px 0 rgba(0, 0, 0, 0.3);
    z-index: 1;
    padding: 15px 25px;
    text-align: center;
    transition: background ${TRANSITION_FAST}, color ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};
  }

  a {
    color: ${props => props.theme.font_primary};
    text-decoration: none;
    transition: color ${TRANSITION_FAST};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default StyledOptions;
