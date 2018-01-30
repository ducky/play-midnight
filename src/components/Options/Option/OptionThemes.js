import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { actions } from 'modules/modal';
import { insertAt, replaceItem, removeItem } from 'utils/array';
import { validateId, validateTitle } from 'utils/validation';

import Button from 'components/Button';
import StyledOption, { CollectionItem } from './Option.styled';
import IconCopy from 'components/Icons/IconCopy';
import IconDropper from 'components/Icons/IconDropper';
import IconPencil from 'components/Icons/IconPencil';
import IconTrash from 'components/Icons/IconTrash';

// TODO - Update to be dynamic and allow for createable - false
@connect(null, { showModal: actions.showModal })
class Option extends PureComponent {
  removeColor = (e, { id: colorId, name, accent, background }) => {
    const { id, defaultValues, plural, values, onChange, showModal } = this.props;
    const singleValue = values[id];
    const arrayValue = values[plural];

    e.preventDefault();

    const remove = () => {
      // Remove Item or Reset Default if Empty
      const updatedValues = arrayValue.length > 1 ? removeItem(arrayValue, { id: colorId }) : [...defaultValues];

      // Deleting Current Accent, reset to first in array
      if (singleValue === colorId) {
        onChange({
          id,
          value: updatedValues[0].id,
        });
      }

      onChange({
        id: plural,
        value: updatedValues,
      });
    };

    showModal('themeDelete', {
      type: 'alert',
      closeText: `Delete, It's Pure Garbage`,
      cancelText: `Cancel, Buyer's Remorse`,
      details: { name, accent, background },
      onClose: remove,
    });
  };

  saveColor = ({ id: existingColorId, name: rawName, accent, background }) => {
    const { id, plural, values, onChange } = this.props;
    const arrayValue = values[plural];

    const name = validateTitle(rawName);
    const colorId = existingColorId ? existingColorId : validateId(name);

    onChange({
      id: plural,
      value: replaceItem(arrayValue, { id: colorId, name, accent, background }),
    });

    onChange({
      id,
      value: colorId,
    });
  };

  duplicateColor = (e, { name: rawName, accent, background }, index) => {
    e.preventDefault();

    const { plural, values, onChange, showModal } = this.props;
    const arrayValue = values[plural];

    const name = validateTitle(`${rawName} Copy`);
    const id = validateId(name);

    onChange({
      id: plural,
      value: insertAt(arrayValue, { id, name, accent, background }, index),
    });

    showModal('themePicker', {
      details: { id, name, accent, background },
      onClose: this.saveColor,
    });
  };

  editColor = (e, details) => {
    e.preventDefault();

    const { showModal } = this.props;

    showModal('themePicker', {
      details,
      onClose: this.saveColor,
    });
  };

  render() {
    const { id, plural, title, description, theme, values, onTargetedChange } = this.props;
    const singleValue = values[id];
    const arrayValues = values[plural];

    const renderItems = items =>
      items.map((item, i) => {
        const { id: colorId, name, accent, background } = item;

        return (
          <CollectionItem
            className="Option__collection-item"
            key={colorId}
            accent={accent}
            background={background}
            selected={singleValue === colorId}
            theme={theme}
          >
            <input
              name={id}
              value={colorId}
              defaultChecked={singleValue === colorId}
              onClick={onTargetedChange}
              type="radio"
            />
            <div className="CollectionItem__fields">
              <div className="CollectionItem__field CollectionItem__field--title">{name}</div>
            </div>
            <div
              className="CollectionItem__icon CollectionItem__edit"
              title="Edit Color"
              aria-label="Edit Color"
              onClick={e => this.editColor(e, { id: colorId, name, accent, background })}
            >
              <IconPencil style={{ width: 14, height: 14 }} />
            </div>
            <div
              className="CollectionItem__icon CollectionItem__copy"
              title="Copy Color"
              aria-label="Copy Color"
              onClick={e => this.duplicateColor(e, { name, accent, background }, i)}
            >
              <IconCopy style={{ width: 14, height: 14 }} />
            </div>
            <div
              className="CollectionItem__icon CollectionItem__remove"
              title="Remove Color"
              aria-label="Remove Color"
              onClick={e => this.removeColor(e, { id: colorId, name, accent, background })}
            >
              <IconTrash style={{ width: 14, height: 14 }} />
            </div>
          </CollectionItem>
        );
      });

    return (
      <StyledOption>
        <div className="Option__header">
          <div className="Option__content">
            <div className="Option__title">{title}</div>
            <div className="Option__description">{description}</div>
          </div>
          <div className="Option__action">
            <Button className="Option__action-button" onClick={this.editColor}>
              <IconDropper style={{ width: 10, height: 10, marginRight: 5 }} />
              <div style={{ textAlign: 'center', fontSize: 10 }}>NEW THEME</div>
            </Button>
          </div>
        </div>

        <div className="Option__body Option__collection">{renderItems(arrayValues)}</div>
      </StyledOption>
    );
  }
}

export default Option;
