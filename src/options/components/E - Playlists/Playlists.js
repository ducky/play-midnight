import { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import getStyles from './Playlists.styles';
import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import { selectors } from 'modules/options';

const mapStateToProps = state => ({
  visiblePlaylists: selectors.visiblePlaylists(state),
});

@withOptions
@withStyles
@connect(mapStateToProps)
class Playlists extends Component {
  shouldComponentUpdate({ visiblePlaylists: nextPlaylists }) {
    const { visiblePlaylists } = this.props;
    return !isEqual(nextPlaylists, visiblePlaylists);
  }

  render() {
    const { isActive, updateStyles, removeStyles } = this.props;
    const styles = getStyles();

    Object.keys(styles).forEach(id => {
      const style = styles[id];

      if (!isActive(id)) {
        updateStyles(id, style);
      } else {
        removeStyles(id);
      }
    });

    return null;
  }
}

export default Playlists;
