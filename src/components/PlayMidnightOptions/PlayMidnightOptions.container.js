import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'modules/options';

import PlayMidnightOptions from './PlayMidnightOptions';

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state),
  options: selectors.options(state),
  sections: selectors.sortedOptions(state),
  menuVisible: state.options.menuVisible
});

@connect(mapStateToProps, {
  saveOptions: actions.saveOptions,
  toggleMenu: actions.toggleMenu,
  updateOption: actions.updateOption
})
class PlayMidnightOptionsContainer extends PureComponent {
  updateOption = ({ target }) => {
    const { updateOption } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.name;
    updateOption({ id, value });
  };

  updateArray = ({ id, value }) => {
    const { updateOption } = this.props;
    updateOption({ id, value, isArray: true });
  };

  render() {
    const {
      accentColor,
      options,
      sections,
      menuVisible,
      saveOptions,
      toggleMenu
    } = this.props;

    return (
      <PlayMidnightOptions
        accent={accentColor}
        visible={menuVisible}
        sections={sections}
        onClose={() => toggleMenu(false)}
        onSave={() => saveOptions(options)}
        onArrayChange={this.updateArray}
        onOptionChange={this.updateOption}
      />
    );
  }
}

export default PlayMidnightOptionsContainer;
