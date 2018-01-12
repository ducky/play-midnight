import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { actions } from 'modules/options';
import Components from 'options/Components';

import PlayMidnightOptions from './PlayMidnightOptions';
import StyledPlayMidnight from './PlayMidnight.styled';

@connect(null, { fetchOptions: actions.fetchOptions })
class PlayMidnight extends PureComponent {
  componentDidMount() {
    this.props.fetchOptions();
  }

  render() {
    const renderComponents = () => {
      return Components.map((Component, i) => <Component key={i} />);
    };

    return (
      <StyledPlayMidnight>
        <PlayMidnightOptions />
        {renderComponents()}
      </StyledPlayMidnight>
    );
  }
}

export default PlayMidnight;
