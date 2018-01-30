import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import withTheme from 'hoc/withTheme';

import { actions, selectors } from 'modules/options';

import Options from './Options';

const mapStateToProps = state => ({
  sections: selectors.sortedOptions(state),
  values: selectors.optionsValues(state),
  menuVisible: state.options.menuVisible,
});

@withTheme
@connect(mapStateToProps, {
  onSave: actions.saveOptions,
  onToggle: actions.toggleMenu,
  onUpdate: actions.updateOption,
})
class OptionsContainer extends PureComponent {
  closeOptions = () => {
    const { onToggle } = this.props;
    onToggle(false);
  };

  saveOptions = () => {
    const { values, onSave } = this.props;
    onSave(values);
  };

  updateTargetedOption = ({ target }) => {
    const { onUpdate } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.name;
    onUpdate({ id, value });
  };

  updateOption = ({ id, value }) => {
    const { onUpdate } = this.props;
    onUpdate({ id, value });
  };

  render() {
    const { sections, theme, menuVisible, values } = this.props;

    return (
      <Options
        theme={theme}
        visible={menuVisible}
        values={values}
        sections={sections}
        onClose={this.closeOptions}
        onSave={this.saveOptions}
        onOptionChange={this.updateOption}
        onTargetedChange={this.updateTargetedOption}
      />
    );
  }
}

export default OptionsContainer;
