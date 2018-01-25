import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'modules/options';

import PlayMidnightOptions from './PlayMidnightOptions';

const mapStateToProps = state => ({
  theme: selectors.theme(state),
  options: selectors.options(state),
  sections: selectors.sortedOptions(state),
  menuVisible: state.options.menuVisible,
});

@connect(mapStateToProps, {
  saveOptions: actions.saveOptions,
  toggleMenu: actions.toggleMenu,
  updateOption: actions.updateOption,
})
class PlayMidnightOptionsContainer extends PureComponent {
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
    const { options, sections, theme, menuVisible, saveOptions, toggleMenu } = this.props;

    return (
      <PlayMidnightOptions
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

export default PlayMidnightOptionsContainer;
