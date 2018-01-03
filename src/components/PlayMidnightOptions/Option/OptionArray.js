import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { removeItem } from 'utils/array';

import Button from 'components/Button';
import StyledOption from './Option.styled';

const CollectionItem = styled.label`
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

class Option extends PureComponent {
  state = {
    color: '',
    name: '',
    showForm: false
  };

  removeItem = (evt, id) => {
    const { plural, value, values, onChangeValues } = this.props;
    evt.stopPropagation();

    // if (value === id) {
    //   onChange({
    //     // TODO - Fix remove of active item
    //   });
    // }

    onChangeValues({
      id: plural,
      value: removeItem(values, { id })
    });
  };

  saveForm = () => {
    const { plural, values, onChangeValues } = this.props;
    const { color, name: rawName } = this.state;

    const name = rawName.replace(/[^a-zA-Z0-9',"()\s]/g, '');
    const id = name
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s/g, '-')
      .toLowerCase();

    onChangeValues({
      id: plural,
      value: [...values, { id, name, value: color }]
    });
    this.toggleForm();
  };

  toggleForm = toggleState => {
    this.setState(state => ({
      showForm: toggleState !== undefined ? toggleState : !state.showForm
    }));
  };

  updateOption = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(() => ({
      [name]: value
    }));
  };

  render() {
    const { id, title, description, value, values, onChange } = this.props;
    const { name, color, showForm } = this.state;

    return (
      <StyledOption>
        <div className="Option__header">
          <div className="Option__content">
            <div className="Option__title">{title}</div>
            <div className="Option__description">{description}</div>
          </div>
          <div className="Option__action">
            <Button
              className="Option__action-button"
              onClick={() => this.toggleForm()}
            >
              +
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="Option__form">
            <input
              type="text"
              name="name"
              maxLength="24"
              onChange={this.updateOption}
              value={name}
            />
            <input
              type="text"
              name="color"
              onChange={this.updateOption}
              value={color}
            />
            <Button onClick={this.saveForm}>Save</Button>
            <Button onClick={() => this.toggleForm(false)}>Cancel</Button>
          </div>
        )}

        <div className="Option__body Option__collection">
          {values.map(({ id: colorId, name, value: colorValue }) => (
            <CollectionItem
              className="Option__collection-item"
              key={colorId}
              background={colorValue}
              selected={value === colorId}
            >
              <input
                name={id}
                value={colorId}
                defaultChecked={value === colorId}
                onClick={onChange}
                type="radio"
              />
              <div className="CollectionItem__fields">
                <div className="CollectionItem__field CollectionItem__field--title">
                  {name}
                </div>
                <div className="CollectionItem__field">
                  {colorValue.toUpperCase()}
                </div>
              </div>
              <div
                className="CollectionItem__remove"
                onClick={e => this.removeItem(e, colorId)}
              />
            </CollectionItem>
          ))}
        </div>
      </StyledOption>
    );
  }
}

export default Option;
