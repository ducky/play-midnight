import React, { PureComponent } from 'react';
import styled from 'styled-components';

import OPTIONS, { DEFAULT_OPTIONS } from '../options';
import { load, save } from '../utils/api';

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

  getOptionValue = key => {
    return this.state.options[key];
  };

  updateOptionsShown = value => {
    this.setState(state => ({
      optionsShown: value !== undefined ? value : !state.optionsShown
    }));
  };

  updateOption = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(state => ({
      options: {
        ...state.options,
        [name]: value
      }
    }));
  };

  saveOptions = async () => {
    const { options: toSave } = this.state;
    const options = await save(toSave);
    this.setState({ options });
  };

  async componentDidMount() {
    const options = await load(DEFAULT_OPTIONS);
    this.setState({ options });
  }

  render() {
    const { options: optionsValues, optionsShown } = this.state;

    const options = OPTIONS.map(option => ({
      ...option,
      value: optionsValues[option.key]
    }));

    const renderOptions = options =>
      options.map(
        ({ key, value, Component }) => value && <Component key={key} />
      );

    return (
      <Wrapper>
        <PlayMidnightFAB onClick={this.updateOptionsShown} />
        <PlayMidnightOptions
          visible={optionsShown}
          options={options}
          onClose={() => this.updateOptionsShown(false)}
          onSave={this.saveOptions}
          onOptionChange={this.updateOption}
        />
        {renderOptions(options)}
      </Wrapper>
    );
  }
}

export default PlayMidnight;
