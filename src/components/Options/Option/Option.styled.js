import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { TRANSITION_FAST } from 'style/theme';

export const CollectionItem = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 1;
  min-width: 33.33%;
  height: 85px;
  transition: all ${TRANSITION_FAST};
  padding: 8px 32px;
  cursor: pointer;
  overflow: hidden;
  background: ${props => props.background || 'transparent'};
  ${props => props.selected && `padding-bottom: 18px`};

  input {
    display: none;
  }

  .CollectionItem__fields {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transform: scale3d(1.3, 1.3, 1.3);
    text-shadow: 1px 1px 0 ${props => props.theme.black};
    transition: all ${TRANSITION_FAST};
    color: ${props => props.theme.white};
  }

  .CollectionItem__field {
    font-size: 12px;
    margin: 0 0 3px;

    &.CollectionItem__field--title {
      font-weight: 700;
      font-size: 14px;
    }

    &:last-child {
      margin: 0;
    }
  }

  &:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props => props.accent || 'transparent'};
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  }

  &:after {
    position: absolute;
    content: 'ACTIVE SELECTION';
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.25);
    color: ${props => props.theme.white};
    text-shadow: 1px 1px 0 ${props => props.theme.black};
    padding: 3px 10px;
    font-size: 10px;
    text-align: center;
    transform: scale3d(1.1, 1.1, 1.1);
    opacity: 0;
    transition: all ${TRANSITION_FAST};

    ${props => props.selected && `opacity: 1`};
    ${props => props.selected && `transform: scale3d(1, 1, 1)`};
  }

  &:hover {
    .CollectionItem__fields {
      transform: scale3d(1, 1, 1);
      visibility: visible;
      opacity: 1;
    }

    .CollectionItem__icon {
      opacity: 0.8;
      transform: scale3d(1, 1, 1);
    }
  }

  .CollectionItem__icon {
    position: absolute;
    top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: ${props => props.theme.white};
    background-color: rgba(0, 0, 0, 0.25);
    cursor: pointer;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0;
    transform: scale3d(0.75, 0.75, 0.75);
    transition: all ${TRANSITION_FAST};

    &:hover {
      transform: scale3d(1.15, 1.15, 1.15);
    }
  }

  .CollectionItem__edit {
    left: 4px;
  }

  .CollectionItem__copy {
    left: 4px;
    top: 32px;
  }

  .CollectionItem__remove {
    right: 4px;
  }

  &:active,
  &:focus {
    opacity: 0.9;
  }
`;

const StyledOption = styled.div`
  background: ${props => props.theme.B300};
  border-bottom: 1px solid ${props => props.theme.B500};
  transition: background ${TRANSITION_FAST}, color ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};

  &:last-child {
    border: none;
  }

  .Option__header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
  }

  .Option__content {
    margin-right: 15px;
  }

  .Option__action {
    margin-left: auto;
  }

  .Option__action-button {
    font-size: 10px;
    line-height: 1.2;
    align-self: stretch;
  }

  .Option__title {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .Option__description {
    font-size: 13px;
    line-height: 1.6;
    font-weight: 300;
  }

  .Option__color-slider {
    padding: 25px;
  }

  .Option__collection {
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      perspective: 1000;
    }
  }
`;

export default withTheme(StyledOption);
