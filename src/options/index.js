const OPTIONS = [
  require('./enabled'),
  require('./accents'),
  require('./favicon')
];

export const DEFAULT_OPTIONS = OPTIONS.reduce((obj, option) => {
  obj[option.key] = option.defaultValue;
  return obj;
}, {});

export default OPTIONS;
