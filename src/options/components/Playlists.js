import React, { Component, Fragment } from 'react';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import styles from './Playlists.styles';

@withOptions
@withStyles(styles)
class Playlists extends Component {
  relatedOptions = ['thumbsUp', 'soundSearch', 'lastAdded', 'freePurchased'];

  render() {
    const { options, Stylesheet: StylesheetList } = this.props;

    const enabledList = this.relatedOptions
      .filter(id => !options[id])
      .map(id => ({ id, Stylesheet: StylesheetList[id] }));

    const renderAll = (enabledList, relatedOptions) => {
      const Stylesheet = StylesheetList['all'];
      return enabledList.length === relatedOptions.length && Stylesheet ? <Stylesheet /> : null;
    };

    return (
      <Fragment>
        {enabledList.map(({ id, Stylesheet }) => (Stylesheet ? <Stylesheet key={id} /> : null))}
        {renderAll(enabledList, this.relatedOptions)}
      </Fragment>
    );
  }
}

export default Playlists;
