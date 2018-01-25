import { injectGlobal } from 'styled-components';

import { getUrl } from 'lib/api';
import PlayMidnightLogo from 'assets/images/play-logo-dark.png';

injectGlobal`
  body{
    -webkit-font-smoothing: antialiased;
  }

  #splash-screen {
  #loading-progress-content {
    position: relative;

    &:before {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 256px;
      height: 256px;
      background: url(${getUrl(PlayMidnightLogo)});
      background-size: 256px 256px;
    }

    svg {
      visibility: hidden;
      opacity: 0;
    }
  }
`;
