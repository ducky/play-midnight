import styled from 'styled-components';

import withTheme from 'hoc/withTheme';

import { lighten } from 'style/theme';

const NotificationModal = styled.div`
  a {
    color: ${props => props.theme.font_primary};
  }

  .Modal {
    max-width: 750px;
  }

  .Modal__header {
    text-align: center;
    background: ${lighten(props => props.theme.background_dark, 8)};
    color: #fff;
    border-bottom: 1px solid ${props => props.theme.border_page};
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
      color: #fff;
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

    .Modal__title {
      background: ${lighten(props => props.theme.background_dark, 8)};
      font-size: 16px;
      font-weight: 700;
      padding: 15px 25px;
      margin: 0 0 25px;
      border-bottom: 1px solid #141517;

      &:last-child {
        margin: 0;
      }
    }

    .Modal__list {
      .Modal__title {
        margin: 0;
      }
    }

    .Modal__release {
      padding: 15px 25px;
      margin: 0;
      border-bottom: 1px solid #141517;

      &-title {
        font-weight: 700;
        margin: 0 0 5px;
      }

      &:last-child {
        border: none;
      }
    }

    .Modal__text {
      padding: 0 25px;
      margin: 0 0 25px;

      &:last-child {
        margin: 0;
      }
    }
  }

  .Modal__footer {
    padding: 15px 25px;
    background: ${lighten(props => props.theme.background_dark, 8)};
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
