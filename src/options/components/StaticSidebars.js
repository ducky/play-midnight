import React, { Component, Fragment } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './StaticSidebars.styles';

@withOptions
@withStyles(styles)
class StaticSidebars extends Component {
  relatedOptions = ['staticPlaylists', 'staticSidebar'];

  render() {
    const { options, Stylesheet: StylesheetList } = this.props;

    const enabledList = this.relatedOptions
      .filter(id => options[id])
      .map(id => ({ id, Stylesheet: StylesheetList[id] }));

    return (
      <Fragment>{enabledList.map(({ id, Stylesheet }) => (Stylesheet ? <Stylesheet key={id} /> : null))}</Fragment>
    );
  }
}

export default StaticSidebars;
