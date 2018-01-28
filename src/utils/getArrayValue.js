import find from 'lodash/find';

const getArrayValue = (arr = [], id = '', defaultValue, useValue = true) => {
  const foundOptions = find(arr, { id });

  if (foundOptions) {
    const foundValue = find(foundOptions.values, { id: foundOptions.value });
    return foundValue ? (useValue ? foundValue.value : foundValue) : defaultValue;
  }

  return defaultValue;
};

export default getArrayValue;
