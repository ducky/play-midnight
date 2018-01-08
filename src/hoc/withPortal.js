import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import getInjectedElement from 'utils/getInjectedElement';

// There has to be a better way to do this... 😭
const withPortal = (id, where) => Component => {
  class StyleComponent extends PureComponent {
    static id = id;

    state = {
      render: false
    };

    constructor(props) {
      super(props);
      this.el = document.querySelector(where);
    }

    async componentDidMount() {
      if (this.el) {
        this.setState({ render: true });
      } else {
        this.el = await getInjectedElement(
          'div',
          { id: `play-midnight-${id}` },
          where
        );
        this.setState({ render: true });
      }
    }

    render() {
      const { render } = this.state;
      return render ? createPortal(<Component />, this.el) : null;
    }
  }

  return StyleComponent;
};

export default withPortal;
