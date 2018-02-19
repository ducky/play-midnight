import { injectGlobal } from 'styled-components';

import { getUrl } from 'lib/api';
import PlayMidnightLogo from 'assets/images/Logo.svg';

injectGlobal`
  body{
    -webkit-font-smoothing: antialiased;
  }

  #splash-screen {
  #loading-progress-content {
    position: relative;

    &:before {
      position: absolute;
      top: 90px;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 228px;
      height: 228px;
      background: url(${getUrl(PlayMidnightLogo)});
      background-size: 228px 228px;
    }

    svg {
      visibility: hidden;
      opacity: 0;
    }
  }
`;
