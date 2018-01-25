import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { selectors } from 'modules/options';

const mapStateToProps = state => ({
  theme: selectors.theme(state),
});

const withTheme = Component => {
  @connect(mapStateToProps)
  class StyleComponent extends PureComponent {
    render() {
      const { theme } = this.props;
      return <Component theme={theme} {...this.props} />;
    }
  }

  return StyleComponent;
};

export default withTheme;
