import uuid from 'uuid/v1';

export const validateTitle = (title = '') => {
  return title.replace(/[^a-zA-Z0-9',"()\s]/g, '');
};

export const validateId = (id = '') => {
  const cleansed = id
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s/g, '-')
    .toLowerCase();

  return `${cleansed}-${uuid()}`;
};
