import find from 'lodash/find';

const getArrayValue = (arr = [], id = '', defaultValue) => {
  const foundOptions = find(arr, { id });

  if (foundOptions) {
    const foundValue = find(foundOptions.values, { id: foundOptions.value });
    return foundValue ? foundValue.value : defaultValue;
  }

  return defaultValue;
};

export default getArrayValue;
