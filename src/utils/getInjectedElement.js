export default (type, id, where = 'body') => {
  let element = document.querySelector(`${type}#${id}`);

  if (element) {
    return element;
  }

  const container = document.querySelector(where);
  element = document.createElement(type);
  element.id = id;
  container.appendChild(element);
  return element;
};
