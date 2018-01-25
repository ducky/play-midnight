import color from 'tinycolor2';

export const transparentize = (c, amount) => {
  return color(c)
    .setAlpha(amount)
    .toString();
};

export const isDark = c => {
  return color(c).getBrightness() <= 165;
};

export const isLight = c => {
  return color(c).getBrightness() > 165;
};

export const darken = (c, amount) => {
  return color(c)
    .darken(amount)
    .toHexString();
};

export const lighten = (c, amount) => {
  return color(c)
    .lighten(amount)
    .toHexString();
};

export const DEFAULT_ACCENT = '#ec4e28';
export const DEFAULT_BACKGROUND = '#141517';
export const TRANSITION_LIGHTNING = '200ms';
export const TRANSITION_FAST = '300ms';
export const TRANSITION_MEDIUM = '500ms';
export const TRANSITION_SLOW = '700ms';

export const stripTransition = transition => parseInt(transition.replace('ms', ''), 10);

export const createTheme = (background = DEFAULT_BACKGROUND, accent = DEFAULT_ACCENT) => ({
  accent,
  background,
  font_primary: isLight(background) ? '#141517' : '#ececec',
  font_secondary: isLight(background) ? '#555' : '#888',
  blue: '#007AA5',
  green: '#009d00',
  red: '#9d0000',

  // Nav
  background_nav: lighten(background, 3),
  border_nav: darken(background, 3),

  // Page
  background_page: lighten(background, 3),
  border_page: darken(background, 3),

  // Cards
  background_card: lighten(background, 3),

  // Player
  background_player: lighten(background, 5),

  // Menu
  background_menu: lighten(background, 5),
  border_menu: darken(background, 1),

  // Search
  background_search: lighten(background, 8),
  border_search: lighten(background, 2),
});
