import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { selectors } from 'modules/options';

const mapStateToProps = state => ({
  options: selectors.optionsValues(state),
});

const withOptions = Component => {
  @connect(mapStateToProps)
  class OptionsComponent extends PureComponent {
    render() {
      return <Component {...this.props} />;
    }
  }

  return OptionsComponent;
};

export default withOptions;
