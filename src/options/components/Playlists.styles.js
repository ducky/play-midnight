import { css } from 'styled-components';

import createStylesheet from 'utils/createStylesheet';

const styles = () => ({
  thumbsUp: css`
    .sj-right-drawer .autoplaylist-section [data-id = 'auto-playlist-thumbs-up'] {
      display: none;
    }
  `,
  lastAdded: css`
    .sj-right-drawer .autoplaylist-section [data-id = 'auto-playlist-recent'] {
      display: none;
    }
  `,
  freePurchased: css`
    .sj-right-drawer .autoplaylist-section [data-id = 'auto-playlist-promo'] {
      display: none;
    }
  `,
});

export default createStylesheet(styles);
