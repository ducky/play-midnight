import color from 'tinycolor2';

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

export const colors = {
  background_dark: '#141517',
  background_light: '#ececec',
  font_primary: '#ececec',
  font_secondary: '#888',
  blue: '#007AA5',
  green: '#009d00',
  red: '#9d0000',
};

// Nav
colors.background_nav = lighten(colors.background_dark, 3);
colors.border_nav = darken(colors.background_nav, 5);

// Page
colors.background_page = lighten(colors.background_dark, 3);
colors.border_page = darken(colors.background_page, 5);

// Cards
colors.background_card = lighten(colors.background_dark, 3);

// Player
colors.background_player = lighten(colors.background_dark, 5);

// Menu
colors.background_menu = lighten(colors.background_dark, 5);
colors.border_menu = darken(colors.background_menu, 5);

// Search
colors.background_search = lighten(colors.background_dark, 8);
colors.border_search = darken(colors.background_search, 3);
