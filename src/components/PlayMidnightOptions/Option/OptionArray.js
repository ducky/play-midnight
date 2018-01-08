import React, { PureComponent } from 'react';

import { removeItem } from 'utils/array';

import Button from 'components/Button';
import StyledOption, { CollectionItem } from './Option.styled';

class Option extends PureComponent {
  state = {
    color: '',
    name: '',
    showForm: false
  };

  removeItem = id => {
    const {
      id: optionId,
      defaultValues,
      plural,
      value,
      values,
      onChange,
      onChangeValues
    } = this.props;

    // Remove Item or Reset Default if Empty
    const updatedValues =
      values.length > 1 ? removeItem(values, { id }) : [...defaultValues];

    // Deleting Current Accent, reset to first in array
    if (value === id) {
      onChange({
        id: optionId,
        value: updatedValues[0].id
      });
    }

    onChangeValues({
      id: plural,
      value: updatedValues
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
