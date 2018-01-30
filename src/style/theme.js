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
export const FONT_LIGHT = '#212121';
export const FONT_DARK = '#ececec';
export const TRANSITION_LIGHTNING = '200ms';
export const TRANSITION_FAST = '300ms';
export const TRANSITION_MEDIUM = '500ms';
export const TRANSITION_SLOW = '700ms';

export const stripTransition = transition => parseInt(transition.replace('ms', ''), 10);

export const createTheme = (enabled = false, background = DEFAULT_BACKGROUND, accent = DEFAULT_ACCENT) => ({
  enabled,
  black: '#000',
  white: '#fff',
  font_google: '#212121',
  font_primary: isLight(background) ? FONT_LIGHT : FONT_DARK,
  font_secondary: isLight(background) ? lighten(FONT_LIGHT, 25) : darken(FONT_DARK, 25),
  red: '#9d0000',

  B25: lighten(background, 13),
  B50: lighten(background, 11),
  B100: lighten(background, 9),
  B200: lighten(background, 7),
  B300: lighten(background, 5),
  B400: lighten(background, 3),
  B500: background,
  B600: darken(background, 3),
  B700: darken(background, 5),
  B800: darken(background, 7),
  B900: darken(background, 9),

  A50: lighten(accent, 11),
  A100: lighten(accent, 9),
  A200: lighten(accent, 7),
  A300: lighten(accent, 5),
  A400: lighten(accent, 3),
  A500: accent,
  A600: darken(accent, 3),
  A700: darken(accent, 5),
  A800: darken(accent, 7),
  A900: darken(accent, 9),
});
