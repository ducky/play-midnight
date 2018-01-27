import React, { PureComponent } from 'react';
import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { TRANSITION_FAST } from 'style/theme';

const StyledSection = styled.div`
  &:last-child .Options__section-options {
    border: none;
  }

  .Section__title {
    display: flex;
    align-items: center;
    background: ${props => props.theme.B400};
    margin: 0;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid ${props => props.theme.B500};
    cursor: pointer;
    transition: background ${TRANSITION_FAST}, color ${TRANSITION_FAST}, border-color ${TRANSITION_FAST};

    &:last-child {
      border: none;
    }
  }

  .Section__text {
    margin-right: 15px;
  }

  .Section__toggle {
    margin-left: auto;

    .Section__toggle-icon {
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      border-right: 2px solid ${props => props.theme.font_primary};
      border-bottom: 2px solid ${props => props.theme.font_primary};
      transition: transform ${TRANSITION_FAST};

      ${props => !props.toggled && `transform: rotate(-45deg)`};
    }
  }

  .Section__options {
    border-bottom: 1px solid ${props => props.theme.B500};
    transition: border-color ${TRANSITION_FAST};

    ${props => !props.toggled && `display: none`};
    ${props => !props.toggled && `border-bottom-color: transparent`};

    &:empty {
      border: none;
    }
  }
`;

@withTheme
class Section extends PureComponent {
  state = {
    toggled: this.props.closed ? false : true,
  };

  onToggle = () => {
    this.setState(state => ({
      toggled: !state.toggled,
    }));
  };

  render() {
    const { toggled } = this.state;
    const { children, title, theme } = this.props;

    return (
      <StyledSection theme={theme} toggled={toggled}>
        {title && (
          <div className="Section__title" onClick={this.onToggle}>
            <div className="Section__text">{title}</div>
            <div className="Section__toggle">
              <div className="Section__toggle-icon" />
            </div>
          </div>
        )}
        <div className="Section__options">{children}</div>
      </StyledSection>
    );
  }
}

export default Section;
