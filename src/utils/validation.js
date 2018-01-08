export const validateTitle = (title = '') => {
  return title.replace(/[^a-zA-Z0-9',"()\s]/g, '');
};

export const validateId = (id = '') => {
  return id
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s/g, '-')
    .toLowerCase();
};
