import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions, selectors } from 'modules/options';
import { actions as modalActions } from 'modules/modal';
import { actions as toastActions } from 'modules/toast';
import Components from 'options/Components';

import Button from './Button';
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
  fetchOptions: actions.fetchOptions,
  showModal: modalActions.showModal,
  createToast: toastActions.createToast
})
class PlayMidnight extends PureComponent {
  componentDidMount() {
    this.props.fetchOptions();
  }

  render() {
    const { options, createToast, showModal } = this.props;

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
        <Button
          onClick={() => {
            showModal('alert', {
              title: 'Nice Buns',
              message: 'You has nice buns',
              closeText: 'Thanks! 😭',
              onClose: () =>
                createToast('success', {
                  title: 'Buns Success!',
                  message: 'You rocked it!'
                })
            });
          }}
        >
          Modal
        </Button>
        <PlayMidnightOptions />
        {renderOptions(options)}
      </Wrapper>
    );
  }
}

export default PlayMidnight;
