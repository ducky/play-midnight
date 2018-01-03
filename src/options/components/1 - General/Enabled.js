import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { css } from 'styled-components';

import { selectors } from 'modules/options';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'enabled';

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state)
});

@withStyles(OPTION_ID)
@connect(mapStateToProps)
class Enabled extends PureComponent {
  componentWillUnmount() {
    this.props.removeStyles();
  }

  render() {
    const styles = css`
      body {
        background: #141517;
        transition: background 300ms;
      }
    `;

    this.props.updateStyles(styles);

    return null;
  }
}

export default Enabled;
