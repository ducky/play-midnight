export default (css = []) => {
  const cssString = css
    .join('')
    .replace(/[\n\r\t]/gi, '')
    .replace(/[\s]{2,}/g, ' ');
  return cssString;
};
