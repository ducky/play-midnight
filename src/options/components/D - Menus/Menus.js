import { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import getStyles from './Menus.styles';
import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import { selectors } from 'modules/options';

const mapStateToProps = state => ({
  visibleMenus: selectors.visibleMenus(state),
});

@withOptions
@withStyles
@connect(mapStateToProps)
class Menus extends Component {
  shouldComponentUpdate({ visibleMenus: nextMenus }) {
    const { visibleMenus } = this.props;
    return !isEqual(nextMenus, visibleMenus);
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

export default Menus;
