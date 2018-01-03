export default (type, attributes = { id: '' }, where = 'body') => {
  let element = document.querySelector(`${type}#${attributes.id}`);

  if (element) {
    return element;
  }

  const container = document.querySelector(where);
  element = document.createElement(type);

  Object.keys(attributes).forEach(key => {
    const attribute = attributes[key];
    element[key] = attribute;
  });

  container.appendChild(element);
  return element;
};
