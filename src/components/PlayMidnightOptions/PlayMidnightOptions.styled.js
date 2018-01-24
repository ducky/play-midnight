import styled from 'styled-components';

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
  color: #dcdcdc;
  background: #242527;
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19);
  transform-origin: center bottom 0;
  transition: transform 0.3s;

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
    border: 8px solid black;
    border-color: transparent transparent #1b1c1f #1b1c1f;
    box-shadow: -12px 12px 15px 0 rgba(0, 0, 0, 0.24);
  }

  .animate-enter & {
    transform: scale(0.2);
    opacity: 0.01;
  }

  .animate-enter.animate-enter-active & {
    transform: scale(1);
    opacity: 1;
    transition: transform 300ms, opacity 300ms;
  }

  .animate-leave & {
    transform: scale(1);
    opacity: 1;
  }

  .animate-leave.animate-leave-active & {
    transform: scale(0.2);
    opacity: 0.01;
    transition: transform 300ms, opacity 300ms;
  }

  .PlayMidnightOptions__header {
    text-align: center;
    flex: 0 0 auto;
    background: #27292d;
    border-bottom: 1px solid #0f1012;
    padding: 15px 25px;

    .PlayMidnightOptions__header-logo {
      height: 50px;
      width: auto;
      margin: 0 0 10px;
    }

    .PlayMidnightOptions__header-title {
      font-weight: 300;
      font-size: 28px;
      margin: 0 0 5px;

      span {
        font-weight: 100;
      }
    }

    .PlayMidnightOptions__header-version {
      font-size: 10px;
      font-weight: 700;
    }
  }

  .PlayMidnightOptions__section {
    &:last-child .PlayMidnightOptions__section-options {
      border: none;
    }

    .PlayMidnightOptions__section-title {
      background: #1b1c1f;
      margin: 0;
      padding: 15px 20px;
      font-weight: 700;
      border-bottom: 1px solid #141517;

      &:last-child {
        border: none;
      }
    }

    .PlayMidnightOptions__section-options {
      border-bottom: 1px solid #141517;

      &:empty {
        border: none;
      }
    }
  }

  .PlayMidnightOptions__options {
    position: relative;
    flex: 1 1 auto;
    overflow: hidden;
    box-shadow: inset 0 5px 25px 0 rgba(0, 0, 0, 0.12), inset 0 -5px 25px 0 rgba(0, 0, 0, 0.12);

    .PlayMidnightOptions__options-container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
    }
  }

  .PlayMidnightOptions__footer {
    flex: 0 0 auto;
    background: #1b1c1f;
    border-top: 1px solid #141517;
    padding: 15px 25px;
    text-align: center;
  }

  a {
    color: #dcdcdc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default StyledOptions;
