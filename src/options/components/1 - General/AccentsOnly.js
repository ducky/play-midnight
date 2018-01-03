import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { css } from 'styled-components';

import { selectors } from 'modules/options';

import withStyles from 'hoc/withStyles';

const OPTION_ID = 'accentsOnly';

const mapStateToProps = state => ({
  accentColor: selectors.accentColor(state)
});

@withStyles(OPTION_ID)
@connect(mapStateToProps)
class AccentsOnly extends PureComponent {
  componentWillUnmount() {
    this.props.removeStyles();
  }

  render() {
    const styles = css`
      body {
        font-style: italic;
      }
    `;

    this.props.updateStyles(styles);

    return null;
  }
}

export default AccentsOnly;
