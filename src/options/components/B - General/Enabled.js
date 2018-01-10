import { PureComponent } from 'react';
import { connect } from 'react-redux';

import withOptions from 'hoc/withOptions';
import withStyles from 'hoc/withStyles';

import { selectors } from 'modules/options';
import getStyles from './Enabled.styles';

const OPTION_ID = 'enabled';

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state),
});

@withOptions
@withStyles
@connect(mapStateToProps)
class Enabled extends PureComponent {
  render() {
    const { accentColor, isActive } = this.props;
    const styles = getStyles(accentColor.value);

    if (isActive(OPTION_ID)) {
      this.props.updateStyles(OPTION_ID, styles);
    } else {
      this.props.removeStyles(OPTION_ID);
    }

    return null;
  }
}

export default Enabled;
