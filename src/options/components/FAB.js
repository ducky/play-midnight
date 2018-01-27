import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import withOptions from 'hoc/withOptions';
import withPortal from 'hoc/withPortal';
import withStyles from 'hoc/withStyles';
import withTheme from 'hoc/withTheme';

import { actions } from 'modules/options';

import styles, { StyledFAB } from './FAB.styles';
import IconGear from 'components/Icons/IconGear';

const mapStateToProps = ({ options }) => ({
  menuVisible: options.menuVisible,
});

@withTheme
@withOptions
@withStyles(styles)
@withPortal('#material-player-right-wrapper')
@connect(mapStateToProps, { toggleMenu: actions.toggleMenu })
class FAB extends PureComponent {
  render() {
    const { isActive, theme, menuVisible, toggleMenu, Stylesheet } = this.props;

    return (
      <Fragment>
        <StyledFAB useAccent={menuVisible} enabled={isActive('enabled')} theme={theme} onClick={() => toggleMenu()}>
          <IconGear />
        </StyledFAB>
        <Stylesheet />
      </Fragment>
    );
  }
}

export default FAB;
