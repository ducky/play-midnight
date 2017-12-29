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
  position: fixed;
  display: flex;
  flex-flow: column;
  left: calc(50vw - 300px);
  bottom: 110px;
  width: 600px;
  height: calc(100vh - 110px - 137px);
  max-height: 750px;
  margin: 0;
  border-radius: 3px;
  z-index: 110;
  color: #dcdcdc;
  transform-origin: center bottom 0;
  /* transform: scale(0); */
  transition: transform 0.3s;
  background: #242527;
  box-shadow: 0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3);

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
    border-color: transparent transparent #242527 #242527;
    box-shadow: -12px 12px 15px 0 rgba(0, 0, 0, 0.24);
  }

  ${props => props.visible && `transform: scale(1)`};

  .PlayMidnightOptions__header {
    text-align: center;
    flex: 0 0 auto;
    background: #343537;
    border-bottom: 1px solid #242527;
    padding: 15px 25px;

    .pm-logo {
      height: 50px;
      width: auto;
    }

    h1 {
      background: none;
      padding: 0;
      margin-top: 10px;
    }

    h6 {
      background: none;
      padding: 5px;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    background: #242527;
    margin: 0;
    padding: 15px 25px;

    span {
      font-weight: 100;
    }

    .subtitle {
      font-size: 14px;
    }
  }

  a {
    color: #dcdcdc;
  }

  .PlayMidnightOptions__options {
    position: relative;
    flex: 1 1 auto;
    overflow: hidden;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.12);

    .PlayMidnightOptions__options-container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
    }
  }

  .PlayMidnightOptions__options-save {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color_accent;
    padding: 10px 15px;
    color: #fff;
    text-align: center;
    transform: translateY(100%);
    transition: all 0.5s;

    &.visible {
      transform: translateY(0);
      visibility: visible;
      opacity: 1;
    }
  }

  .PlayMidnightOptions__footer {
    flex: 0 0 auto;
    background: #242527;
    border-top: 1px solid #343537;
    padding: 15px 25px;
    text-align: center;
  }
`;

export default StyledOptions;
