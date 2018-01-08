const LOCAL_STORAGE_KEY = 'PLAY_MIDNIGHT';
const IS_EXTENSION = chrome.storage !== undefined;

export const getUrl = url => {
  if (chrome.extension) {
    return chrome.extension.getURL(url);
  } else {
    return url;
  }
};

export const load = async data => {
  return new Promise(resolve => {
    if (IS_EXTENSION) {
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

export const loadBackground = async data => {
  return new Promise(resolve => {
    if (IS_EXTENSION) {
      return chrome.runtime.sendMessage(data, resolve);
    } else {
      console.log('Load Background Fallback!', data);
      resolve(data);
    }
  });
};

export const save = async data => {
  return new Promise(resolve => {
    if (IS_EXTENSION) {
      return chrome.storage.sync.set(data, resolve);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      console.log('Saving to Local Storage!', data);
      resolve(data);
    }
  });
};
