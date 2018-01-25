import styled from 'styled-components';

import { getUrl } from 'lib/api';

import withTheme from 'hoc/withTheme';

import iconPencil from 'assets/images/icon-pencil.svg';
import iconTrash from 'assets/images/icon-trash.svg';

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
    text-shadow: 1px 1px 0 ${props => props.theme.background};
    transition: all ${TRANSITION_FAST};
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
    content: 'ACTIVE SELECTION';
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.25);
    color: #fff;
    text-shadow: 1px 1px 0 ${props => props.theme.background};
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

    .CollectionItem__edit,
    .CollectionItem__remove {
      opacity: 0.8;
      transform: scale3d(1, 1, 1);
    }
  }

  .CollectionItem__edit,
  .CollectionItem__remove {
    position: absolute;
    top: 4px;    
    background-color: rgba(0,0,0,0.25);
    width: 24px;
    height: 24px;
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
    background-image: url('${getUrl(iconPencil)}');
    background-size: 14px 14px;
  }

  .CollectionItem__remove {
    right: 4px;
    background-image: url('${getUrl(iconTrash)}');
    background-size: 14px 14px;
  }

  &:active,
  &:focus {
    opacity: 0.9;
  }
`;

const StyledOption = styled.div`
  background: ${props => props.theme.background_menu};
  border-bottom: 1px solid ${props => props.theme.background};
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
