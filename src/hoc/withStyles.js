import React, { PureComponent } from 'react';

import getInjectedElement from 'utils/getInjectedElement';
import getCssString from 'utils/getCssString';

const withStyles = (id, styles) => Component => {
  class StyleComponent extends PureComponent {
    static id = id;

    componentDidMount() {
      const { id } = this.props;
      const style = getInjectedElement('style', `play-midnight-${id}`);
      style.innerText = getCssString(styles);
    }

    componentWillUnmount() {
      const { id } = this.props;
      const style = getInjectedElement('style', `play-midnight-${id}`);
      style.remove();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return StyleComponent;
};

export default withStyles;
