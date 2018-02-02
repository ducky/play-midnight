import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import awaitElement from 'utils/awaitElement';

const withPortal = where => Component => {
  class PortalComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.el = document.querySelector(where);
    }

    async componentDidMount() {
      if (this.el) {
        this.elementExists = true;
      } else {
        this.el = await awaitElement(where);
        this.elementExists = true;
      }
    }

    render() {
      return this.elementExists ? createPortal(<Component {...this.props} />, this.el) : null;
    }
  }

  return PortalComponent;
};

export default withPortal;
