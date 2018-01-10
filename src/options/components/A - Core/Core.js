import { PureComponent } from 'react';
import { connect } from 'react-redux';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import { selectors } from 'modules/options';
import getStyles from './Core.styles';

const OPTION_ID = 'core';

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state),
});

@withOptions
@withStyles
@connect(mapStateToProps)
class Core extends PureComponent {
  render() {
    const { accentColor, updateStyles } = this.props;
    const styles = getStyles(accentColor.value);

    updateStyles(OPTION_ID, styles);

    return null;
  }
}

export default Core;
