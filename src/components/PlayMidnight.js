import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/options';
import Components from 'options/Components';

import PlayMidnightOptions from './PlayMidnightOptions';

const Wrapper = styled.div`
  font-family: 'Roboto', Helvetica, sans-serif;

  * {
    box-sizing: border-box;
  }
`;

const mapStateToProps = state => ({
  options: selectors.options(state)
});

@connect(mapStateToProps, {
  fetchOptions: actions.fetchOptions
})
class PlayMidnight extends PureComponent {
  componentDidMount() {
    this.props.fetchOptions();
  }

  render() {
    const { options } = this.props;

    const renderOptions = options => {
      return options
        .filter(option => {
          return Components[option.id] !== undefined;
        })
        .map(option => {
          const Component = Components[option.id];
          return (
            (option.static || option.value) && (
              <Component key={option.id} {...option} />
            )
          );
        });
    };

    return (
      <Wrapper>
        <PlayMidnightOptions />
        {renderOptions(options)}
      </Wrapper>
    );
  }
}

export default PlayMidnight;
