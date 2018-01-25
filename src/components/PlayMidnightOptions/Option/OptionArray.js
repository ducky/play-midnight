import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { actions } from 'modules/modal';
import { replaceItem, removeItem } from 'utils/array';
import { validateId, validateTitle } from 'utils/validation';

import Button from 'components/Button';
import StyledOption, { CollectionItem } from './Option.styled';

// TODO - Update to be dynamic and allow for createable - false
@connect(null, { showModal: actions.showModal })
class Option extends PureComponent {
  state = {
    color: '',
    name: '',
    showForm: false,
  };

  removeItem = (e, { id, name, color }) => {
    const { id: optionId, defaultValues, plural, value, values, onChange, onChangeValues, showModal } = this.props;

    e.preventDefault();

    const remove = () => {
      // Remove Item or Reset Default if Empty
      const updatedValues = values.length > 1 ? removeItem(values, { id }) : [...defaultValues];

      // Deleting Current Accent, reset to first in array
      if (value === id) {
        onChange({
          id: optionId,
          value: updatedValues[0].id,
        });
      }

      onChangeValues({
        id: plural,
        value: updatedValues,
      });
    };

    showModal('colorDelete', {
      type: 'alert',
      closeText: `Delete, It's Pure Garbage`,
      cancelText: `Cancel, Buyer's Remorse`,
      details: { name, color },
      onClose: remove,
    });
  };

  saveColor = ({ id: existingId, name: rawName, color }) => {
    const { id: optionId, plural, values, onChange, onChangeValues } = this.props;

    const name = validateTitle(rawName);
    const id = existingId ? existingId : validateId(name);

    onChangeValues({
      id: plural,
      value: replaceItem(values, { id, name, value: color }),
    });

    onChange({
      id: optionId,
      value: id,
    });
  };

  editColor = (e, details) => {
    e.preventDefault();
    const { showModal } = this.props;
    showModal('colorPicker', {
      details,
      onClose: this.saveColor,
    });
  };

  updateOption = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { id, title, description, theme, value, values, onTargetedChange } = this.props;

    return (
      <StyledOption>
        <div className="Option__header">
          <div className="Option__content">
            <div className="Option__title">{title}</div>
            <div className="Option__description">{description}</div>
          </div>
          <div className="Option__action">
            <Button className="Option__action-button" onClick={this.editColor}>
              NEW<br />COLOR
            </Button>
          </div>
        </div>

        <div className="Option__body Option__collection">
          {values.map(({ id: colorId, name, value: colorValue }) => (
            <CollectionItem
              className="Option__collection-item"
              key={colorId}
              background={colorValue}
              selected={value === colorId}
              theme={theme}
            >
              <input
                name={id}
                value={colorId}
                defaultChecked={value === colorId}
                onClick={onTargetedChange}
                type="radio"
              />
              <div className="CollectionItem__fields">
                <div className="CollectionItem__field CollectionItem__field--title">{name}</div>
                <div className="CollectionItem__field">{colorValue.toUpperCase()}</div>
              </div>
              <div
                className="CollectionItem__edit"
                onClick={e => this.editColor(e, { id: colorId, name, color: colorValue })}
              />
              <div
                className="CollectionItem__remove"
                onClick={e => this.removeItem(e, { id: colorId, name, color: colorValue })}
              />
            </CollectionItem>
          ))}
        </div>
      </StyledOption>
    );
  }
}

export default Option;
