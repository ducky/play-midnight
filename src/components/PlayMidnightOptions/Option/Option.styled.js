import styled from 'styled-components';

const StyledOption = styled.div`
  border-bottom: 1px solid #141517;

  &:last-child {
    border: none;
  }

  .Option__header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
  }

  .Option__content {
    margin-right: 15px;
  }

  .Option__action {
    margin-left: auto;
  }

  .Option__action-button {
    font-size: 28px;
    line-height: 1;
    align-self: stretch;
  }

  .Option__title {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .Option__description {
    font-size: 13px;
    font-weight: 300;
  }

  .Option__collection {
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      perspective: 1000;
    }
  }
`;

export default StyledOption;
