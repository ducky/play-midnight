import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import withPortal from 'hoc/withPortal';
import withStyles from 'hoc/withStyles';

import { actions, selectors } from 'modules/options';

const OPTION_ID = 'fab';

const styles = css`
  #player #material-player-right-wrapper paper-icon-button[data-id='queue'] {
    margin: 8px;
  }

  #queue-overlay:after {
    right: 72px;
  }
`;

const StyledFAB = styled.div`
  width: 40px;
  height: 40px;
  z-index: 108;
  margin: 4px;
  margin-right: 32px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: opacity 0.3s;
  visibility: visible;
  opacity: 0.9;
  color: ${props => (props.accent ? `${props.accent.value}` : '#dcdcdc')};
  border-radius: 50%;

  &:hover {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  &:active,
  &:focus {
    opacity: 0.8;
    transform: scale3d(0.95, 0.95, 0.95);
  }

  .FAB__icon {
    position: relative;
    width: 100%;
    height: 100%;
    fill: currentcolor;
  }
`;

const mapStateToProps = state => ({
  accent: selectors.accentColor(state)
});

@withPortal(OPTION_ID, '#material-player-right-wrapper')
@withStyles(OPTION_ID)
@connect(mapStateToProps, { toggleMenu: actions.toggleMenu })
class FAB extends PureComponent {
  componentDidMount() {
    this.props.updateStyles(styles);
  }

  componentWillUnmount() {
    this.props.removeStyles();
  }

  render() {
    const { accent, toggleMenu } = this.props;

    return (
      <StyledFAB accent={accent} onClick={() => toggleMenu()}>
        <div className="FAB__icon">
          <svg
            viewBox="0 0 24 24"
            height="100%"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            fit=""
            style={{ pointerEvents: 'none', display: 'block' }}
          >
            <g>
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            </g>
          </svg>
        </div>
      </StyledFAB>
    );
  }
}

export default FAB;
