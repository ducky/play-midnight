import styled from 'styled-components';

export const CollectionItem = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 1;
  min-width: 33.33%;
  height: 85px;
  transition: all 0.5s;
  padding: 8px;
  cursor: pointer;
  overflow: hidden;
  background: ${props => props.background || 'transparent'};
  ${props => props.selected && `padding-bottom: 18px`};

  input {
    display: none;
  }

  .CollectionItem__fields {
    visibility: hidden;
    opacity: 0;
    transform: scale3d(0.7, 0.7, 0.7);
    text-shadow: 1px 1px 0 #141517;
    transition: all 0.5s;
    color: #fff;
    padding: 8px 10px;
    text-align: center;
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

  &:after {
    position: absolute;
    content: 'CURRENT ACCENT';
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.25);
    color: #fff;
    text-shadow: 1px 1px 0 #141517;
    padding: 3px 10px;
    font-size: 10px;
    text-align: center;
    transform: scale3d(1.1, 1.1, 1.1);
    opacity: 0;
    transition: all 0.5s;

    ${props => props.selected && `opacity: 1`};
    ${props => props.selected && `transform: scale3d(1, 1, 1)`};
  }

  &:hover {
    .CollectionItem__fields {
      transform: scale3d(1, 1, 1);
      visibility: visible;
      opacity: 1;
    }

    .CollectionItem__remove {
      opacity: 0.8;
      transform: scale3d(1, 1, 1) rotate(0deg);
    }
  }

  .CollectionItem__remove {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 16px;
    height: 16px;
    opacity: 0;
    transform: scale3d(0.75, 0.75, 0.75) rotate(-45deg);
    transition: all 0.5s;

    &:after,
    &:before {
      position: absolute;
      display: block;
      content: '';
      background: #fff;
      box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
      transform: rotate(45deg);
      transition: all 0.5s;
    }

    &:before {
      top: 7px;
      width: 16px;
      height: 2px;
    }

    &:after {
      left: 7px;
      width: 2px;
      height: 16px;
    }

    &:hover {
      transform: scale3d(1.2, 1.2, 1.2);
      opacity: 1;

      &:after,
      &:before {
        background: #a61a2b;
      }
    }
  }

  &:active,
  &:focus {
    opacity: 0.9;
  }
`;

const StyledOption = styled.div`
  border-bottom: 1px solid #141517;

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
    font-size: 28px;
    line-height: 1;
    align-self: stretch;
  }

  .Option__title {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .Option__description {
    font-size: 13px;
    font-weight: 300;
  }

  .Option__collection {
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      perspective: 1000;
    }
  }
`;

export default StyledOption;
