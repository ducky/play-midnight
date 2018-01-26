import { css } from 'styled-components';

import * as style from 'style/sheets';
import createStylesheet from 'utils/createStylesheet';

const styles = theme => css`
  ${style.core(theme)};
  ${style.accents(theme)};
  ${style.alerts(theme)};
  ${style.buttons(theme)};
  ${style.cardGrid(theme)};
  ${style.cards(theme)};
  ${style.forms(theme)};
  ${style.loading(theme)};
  ${style.menus(theme)};
  ${style.misc(theme)};
  ${style.nav(theme)};
  ${style.page(theme)};
  ${style.player(theme)};
  ${style.queue(theme)};
  ${style.songTable(theme)};
`;

export default createStylesheet(styles);
