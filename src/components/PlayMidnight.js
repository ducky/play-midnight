import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions } from 'modules/options';
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

@connect(null, {
  fetchOptions: actions.fetchOptions,
  showModal: modalActions.showModal,
  createToast: toastActions.createToast,
})
class PlayMidnight extends PureComponent {
  componentDidMount() {
    this.props.fetchOptions();
  }

  render() {
    const { createToast, showModal } = this.props;

    const renderOptions = options => {
      return Components.map((Component, i) => <Component key={i} />);
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
                  message: 'You rocked it!',
                }),
            });
          }}
        >
          Modal
        </Button>
        <PlayMidnightOptions />
        {renderOptions()}
      </Wrapper>
    );
  }
}

export default PlayMidnight;
