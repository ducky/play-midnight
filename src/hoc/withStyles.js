import React, { PureComponent } from 'react';

import getInjectedElement from 'utils/getInjectedElement';
import getCssString from 'utils/getCssString';

const withStyles = id => Component => {
  class StyleComponent extends PureComponent {
    static id = id;

    updateStyles = async styles => {
      const style = await getInjectedElement('style', {
        id: `play-midnight-${id}`
      });
      style.innerText = getCssString(styles);
    };

    removeStyles = async () => {
      const style = await getInjectedElement('style', {
        id: `play-midnight-${id}`
      });
      style.remove();
    };

    render() {
      return (
        <Component
          updateStyles={this.updateStyles}
          removeStyles={this.removeStyles}
          {...this.props}
        />
      );
    }
  }

  return StyleComponent;
};

export default withStyles;
