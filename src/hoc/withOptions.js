import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { selectors } from 'modules/options';
import isOptionActive from 'utils/isOptionActive';

const mapStateToProps = state => ({
  options: selectors.options(state),
});

const withOptions = Component => {
  @connect(mapStateToProps)
  class OptionsComponent extends PureComponent {
    isActive = key => {
      const { options } = this.props;
      return isOptionActive(options, key);
    };

    render() {
      return <Component isActive={this.isActive} {...this.props} />;
    }
  }

  return OptionsComponent;
};

export default withOptions;
