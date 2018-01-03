const removeAllElements = elements => {
  for (let i = 0, len = elements.length; i < len; i++) {
    const element = elements[i];
    element.remove();
  }
};

export default removeAllElements;
