const LOCAL_STORAGE_KEY = 'PLAY_MIDNIGHT';
const IS_EXTENSION = window.chrome && chrome.runtime && chrome.runtime.id;

const urlCache = {};

export const getUrl = url => {
  // Cache url to prevent hitting Chrome all the time
  if (urlCache[url]) return urlCache[url];

  if (IS_EXTENSION) {
    urlCache[url] = chrome.runtime.getURL(url);
  } else {
    urlCache[url] = url;
  }

  return urlCache[url];
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
  return new Promise((resolve, reject) => {
    if (IS_EXTENSION) {
      try {
        return chrome.runtime.sendMessage(chrome.runtime.id, data, resolve);
      } catch (e) {
        // Extension reloaded and can't reach background page
        return reject(e);
      }
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
