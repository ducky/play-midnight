import find from 'lodash/find';

const isOptionActive = (options, id) => {
  const option = find(options, { id });
  return option.value !== false;
};

export default isOptionActive;
