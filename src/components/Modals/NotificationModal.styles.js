import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

const NotificationModal = styled.div`
  a {
    color: ${props => props.theme.font_primary};
  }

  .Modal {
    max-width: 750px;
  }

  .Modal__header {
    text-align: center;
    background: ${props => props.theme.B200};
    color: ${props => props.font_primary};
    border-bottom: 1px solid ${props => props.theme.B600};
    flex: 0 0 auto;
    padding: 15px 25px;
    margin: 0;

    .Modal__header-logo {
      height: 55px;
      width: auto;
      margin: 0 0 10px;
    }

    .Modal__header-title {
      background: none;
      padding: 0;
      font-weight: 500;
      margin: 0 0 5px;

      em {
        font-weight: 300;
      }
    }

    .Modal__header-version {
      font-weight: 300;
      background: none;
      margin: 0;
    }

    a {
      color: ${props => props.font_primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .Modal__content {
    position: relative;
    height: 375px;
    line-height: 1.6;
    overflow: hidden;
    flex: 1 1 auto;
    margin: 0;
    box-shadow: inset 0 5px 25px 0 rgba(0, 0, 0, 0.12), inset 0 -5px 25px 0 rgba(0, 0, 0, 0.12);

    &-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 25px 0;
      overflow: auto;
    }
  }

  .Modal__footer {
    padding: 15px 25px;
    background: ${props => props.theme.B200};
  }

  .Modal__actions {
    display: flex;
    justify-content: center;
    margin: 0 0 5px;

    &:last-child {
      margin: 0;
    }
  }
`;

export default withTheme(NotificationModal);
