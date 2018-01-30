import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import withOptions from 'hoc/withOptions';
import withPortal from 'hoc/withPortal';
import withStyles from 'hoc/withStyles';
import withTheme from 'hoc/withTheme';

import { actions } from 'modules/options';

import styles, { StyledSettings } from './Settings.styles';
import IconGear from 'components/Icons/IconGear';

const mapStateToProps = ({ options }) => ({
  menuVisible: options.menuVisible,
});

@withTheme
@withOptions
@withStyles(styles)
@withPortal('#material-player-right-wrapper')
@connect(mapStateToProps, { toggleMenu: actions.toggleMenu })
class Settings extends PureComponent {
  render() {
    const { options, theme, menuVisible, toggleMenu, Stylesheet } = this.props;

    return (
      <Fragment>
        <StyledSettings useAccent={menuVisible} enabled={options.enabled} theme={theme} onClick={() => toggleMenu()}>
          <IconGear />
        </StyledSettings>
        <Stylesheet />
      </Fragment>
    );
  }
}

export default Settings;
