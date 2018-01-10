import find from 'lodash/find';

const isOptionActive = (options, id) => {
  const option = find(options, { id });
  return option ? option.value !== false : false;
};

export default isOptionActive;
