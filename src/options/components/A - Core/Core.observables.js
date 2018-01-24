// Methods that need to run anytime body changes

export const recentActivity = () => {
  const urlRegex = /(=s90)/;
  const gridItems = document.querySelectorAll('sj-scrolling-module[module-token="CLIENT_SIDE_RECENTS"] sj-card');

  for (let i = 0, len = gridItems.length; i < len; i++) {
    const item = gridItems[i];

    if (!item) continue;

    const img = item.querySelector('img');

    if (img && urlRegex.test(img.src)) {
      img.setAttribute('src', img.src.replace('=s90', '=s150'));
    }
  }
};

export default [recentActivity];
