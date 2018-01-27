import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import { selectors } from 'modules/options';
import styles from './Playlists.styles';

const mapStateToProps = state => ({
  visiblePlaylists: selectors.visiblePlaylists(state),
});

@withOptions
@withStyles(styles)
@connect(mapStateToProps)
class Playlists extends Component {
  shouldComponentUpdate({ visiblePlaylists: nextPlaylists }) {
    const { visiblePlaylists } = this.props;
    return !isEqual(nextPlaylists, visiblePlaylists);
  }

  render() {
    const { isActive, Stylesheet: StylesheetList } = this.props;

    return (
      <Fragment>
        {Object.keys(StylesheetList).map(id => {
          const Stylesheet = StylesheetList[id];
          return !isActive(id) ? <Stylesheet key={id} /> : null;
        })}
      </Fragment>
    );
  }
}

export default Playlists;
