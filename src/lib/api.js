const LOCAL_STORAGE_KEY = 'PLAY_MIDNIGHT';

export const getUrl = url => {
  if (chrome.extension) {
    return chrome.extension.getURL(url);
  } else {
    return url;
  }
};

export const load = async data => {
  return new Promise(resolve => {
    if (chrome.storage) {
      return chrome.storage.sync.get(data, resolve);
    } else {
      const storageContents = localStorage.getItem(LOCAL_STORAGE_KEY);
      const storageData = storageContents ? JSON.parse(storageContents) : data;
      const merged = { ...data, ...storageData };
      console.log('Fetching from Local Storage!', merged);
      resolve(merged);
    }
  });
};

export const save = async data => {
  return new Promise(resolve => {
    if (chrome.storage) {
      return chrome.storage.sync.set(data, resolve);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      console.log('Saving to Local Storage!', data);
      resolve(data);
    }
  });
};
