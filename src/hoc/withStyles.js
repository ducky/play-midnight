import React, { PureComponent } from 'react';

import injectElement from 'utils/injectElement';
import getCssString from 'utils/getCssString';

const withStyles = Component => {
  class StyleComponent extends PureComponent {
    updateStyles = (id, styles) => {
      const style = injectElement('style', {
        id: `play-midnight-${id}`,
      });

      if (style) {
        const newStyles = getCssString(styles);

        // Ensure we don't update dom for no reason
        if (style.innerText !== newStyles) {
          style.innerText = newStyles;
        }
      }
    };

    removeStyles = id => {
      const style = injectElement('style', {
        id: `play-midnight-${id}`,
      });
      if (style) {
        style.remove();
      }
    };

    render() {
      return <Component updateStyles={this.updateStyles} removeStyles={this.removeStyles} {...this.props} />;
    }
  }

  return StyleComponent;
};

export default withStyles;
