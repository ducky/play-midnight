const awaitElement = async (where = 'body') => {
  return new Promise(resolve => {
    // Already Exists
    const target = document.querySelector(where);
    if (target) return resolve(target);

    // Target Not Found
    const observer = new MutationObserver(mutations => {
      const target = document.querySelector(where);
      if (target) {
        observer.disconnect();
        return resolve(target);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
};

export default awaitElement;
