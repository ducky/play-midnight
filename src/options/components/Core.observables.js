import color from 'tinycolor2';

// Methods that need to run anytime body changes

export const recentActivity = () => {
  const urlRegex = /(=s90)/;
  const gridItems = document.querySelectorAll('sj-scrolling-module[module-token="CLIENT_SIDE_RECENTS"] sj-card');

  for (const item of gridItems) {
    if (!item) continue;

    const img = item.querySelector('img');

    if (img && urlRegex.test(img.src)) {
      img.setAttribute('src', img.src.replace('=s90', '=s150'));
    }
  }
};

export const paneBackgrounds = (enabled, theme) => {
  const panes = document.querySelectorAll('#gpm-home-module-0, #gpm-home-module-1');
  const backgroundColor = enabled
    ? color(theme.B500)
        .setAlpha(0.99)
        .toRgbString()
    : 'rgba(250, 250, 250, 1)';

  for (const pane of panes) {
    if (pane.getAttribute('background-color') !== backgroundColor) {
      pane.setAttribute('background-color', backgroundColor);
    }
  }
};

export default [recentActivity, paneBackgrounds];
