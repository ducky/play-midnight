import React, { PureComponent } from 'react';
import styled from 'styled-components';

import OPTIONS, { DEFAULT_OPTIONS } from '../options';
import { load } from '../utils/api';

import PlayMidnightFAB from './PlayMidnightFAB';
import PlayMidnightOptions from './PlayMidnightOptions';

const Wrapper = styled.div`
  font-family: 'Roboto', Helvetica, sans-serif;
`;

class PlayMidnight extends PureComponent {
  state = {
    optionsShown: false,
    options: {}
  };

  updateOptionsShown = value => {
    this.setState(state => ({
      optionsShown: value !== undefined ? value : !state.optionsShown
    }));
  };

  updateOption = key => e => {
    const value = e.target.checked;
    this.setState(state => ({
      options: {
        ...state.options,
        [key]: value
      }
    }));
  };

  async componentDidMount() {
    const options = await load(DEFAULT_OPTIONS);
    this.setState({ options });
  }

  render() {
    const { options, optionsShown } = this.state;
    const OptionComponents = OPTIONS.filter(option => {
      return options[option.key];
    });

    return (
      <Wrapper>
        <PlayMidnightFAB onClick={this.updateOptionsShown} />
        <PlayMidnightOptions
          visible={optionsShown}
          options={OPTIONS}
          optionValues={options}
          onClose={() => this.updateOptionsShown(false)}
          onOptionChange={this.updateOption}
        />
        {OptionComponents.map(({ key, Component }) => <Component key={key} />)}
      </Wrapper>
    );
  }
}

export default PlayMidnight;
