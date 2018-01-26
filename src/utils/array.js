export const getIndex = (arr = [], item = {}, key = 'id') =>
  arr.findIndex(current => {
    return current[key] === item[key] || current[key] === item[key];
  });

export const findItem = (arr = [], item = {}, key = 'id') =>
  arr.find(current => {
    return current[key] === item[key] || current[key] === item[key];
  });

export const insertAt = (arr = [], item = {}, index = -1) => {
  return index > -1
    ? [...arr.slice(0, index + 1), item, ...arr.slice(index + 1)]
    : [...arr, item];
};

export const replaceItem = (arr = [], item = {}, key = 'id') => {
  const index = getIndex(arr, item, key);
  return index > -1
    ? [...arr.slice(0, index), item, ...arr.slice(index + 1)]
    : [...arr, item];
};

export const removeItem = (arr = [], item = {}, key = 'id') => {
  const index = getIndex(arr, item, key);
  return index > -1 ? [...arr.slice(0, index), ...arr.slice(index + 1)] : arr;
};

export const updateItem = (arr = [], item = {}, key = 'id') => {
  const index = getIndex(arr, item, key);
  return index > -1
    ? [
        ...arr.slice(0, index),
        { ...arr[index], ...item },
        ...arr.slice(index + 1)
      ]
    : [...arr, item];
};

export default {};
