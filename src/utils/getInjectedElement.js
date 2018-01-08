const createElement = (type, attrs) => {
  const element = document.createElement(type);

  Object.keys(attrs).forEach(key => {
    const attribute = attrs[key];
    element[key] = attribute;
  });

  return element;
};

const injectElement = (element, where, prepend = false) => {
  const container = document.querySelector(where);

  if (container) {
    if (prepend) {
      container.insertAdjacentElement('afterbegin', element);
    } else {
      container.appendChild(element);
    }

    return element;
  }

  return undefined;
};

export default async (type, attributes, where = 'body') => {
  const { prepend, ...attrs } = attributes;

  return new Promise(resolve => {
    // Already Exists
    const element = document.querySelector(`${type}#${attrs.id}`);
    if (element) return resolve(element);

    // New Element
    const create = createElement(type, attrs);
    const injected = injectElement(create, where, prepend);
    if (injected) return resolve(create);

    // Inject Target Not Found
    const observer = new MutationObserver(mutations => {
      const injected = injectElement(create, where, prepend);
      if (injected) {
        observer.disconnect();
        return resolve(create);
      }
    });

    observer.observe(document.body, { childList: true });
  });
};
