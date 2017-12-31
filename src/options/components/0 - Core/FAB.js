import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions } from 'modules/options';
import checkEnv from 'utils/checkEnv';

const StyledFAB = styled.div`
  position: fixed;
  bottom: 105px;
  right: 24px;
  width: 50px;
  height: 50px;
  z-index: 108;
  padding: 12px;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transition: all 0.3s;
  visibility: visible;
  opacity: 0.9;
  background: #ed6237;
  border-radius: 50%;
  ${() => (checkEnv('development') ? 'bottom: 24px' : null)};

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
    color: #141517;
    fill: currentcolor;
  }
`;

class FAB extends PureComponent {
  static id = 'fab';

  render() {
    const { toggleMenu } = this.props;
    return (
      <StyledFAB onClick={() => toggleMenu()}>
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

export default connect(null, {
  toggleMenu: actions.toggleMenu
})(FAB);
