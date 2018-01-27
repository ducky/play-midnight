import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import { selectors } from 'modules/options';
import styles from './Menus.styles';

const mapStateToProps = state => ({
  visibleMenus: selectors.visibleMenus(state),
});

@withOptions
@withStyles(styles)
@connect(mapStateToProps)
class Menus extends Component {
  shouldComponentUpdate({ visibleMenus: nextMenus }) {
    const { visibleMenus } = this.props;
    return !isEqual(nextMenus, visibleMenus);
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

export default Menus;
