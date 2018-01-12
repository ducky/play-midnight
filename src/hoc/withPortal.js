import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import awaitElement from 'utils/awaitElement';

// There has to be a better way to do this... 😭
const withPortal = (id, where) => Component => {
  class PortalComponent extends PureComponent {
    state = {
      render: false,
    };

    constructor(props) {
      super(props);
      this.el = document.querySelector(where);
    }

    async componentDidMount() {
      if (this.el) {
        this.setState({ render: true });
      } else {
        this.el = await awaitElement(where);
        this.setState({ render: true });
      }
    }

    render() {
      const { render } = this.state;
      return render ? createPortal(<Component {...this.props} />, this.el) : null;
    }
  }

  return PortalComponent;
};

export default withPortal;
