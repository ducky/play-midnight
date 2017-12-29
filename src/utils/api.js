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
      const storage = localStorage.getItem(LOCAL_STORAGE_KEY) || data;
      console.log('Fetching from Local Storage!', storage);
      resolve(storage);
    }
  });
};

export const save = async data => {
  return new Promise(resolve => {
    if (chrome.storage) {
      return chrome.storage.sync.set(data, resolve);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, data);
      console.log('Saving to Local Storage!', data);
      resolve(data);
    }
  });
};
