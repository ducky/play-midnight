import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import withTheme from 'hoc/withTheme';

import { actions, selectors } from 'modules/options';

import Options from './Options';

const mapStateToProps = state => ({
  sections: selectors.sortedOptions(state),
  menuVisible: state.options.menuVisible,
});

@withTheme
@connect(mapStateToProps, {
  saveOptions: actions.saveOptions,
  toggleMenu: actions.toggleMenu,
  updateOption: actions.updateOption,
})
class OptionsContainer extends PureComponent {
  updateTargetedOption = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.name;
    this.props.updateOption({ id, value });
  };

  updateOption = ({ id, value }) => {
    this.props.updateOption({ id, value });
  };

  updateArray = ({ id, value }) => {
    const { updateOption } = this.props;
    updateOption({ id, value, isArray: true });
  };

  render() {
    const { sections, theme, menuVisible, saveOptions, toggleMenu } = this.props;

    return (
      <Options
        theme={theme}
        visible={menuVisible}
        sections={sections}
        onClose={() => toggleMenu(false)}
        onSave={saveOptions}
        onArrayChange={this.updateArray}
        onOptionChange={this.updateOption}
        onTargetedChange={this.updateTargetedOption}
      />
    );
  }
}

export default OptionsContainer;
