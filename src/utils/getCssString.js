export default (css = []) => {
  const cssString = css.join('').replace(/[\n\r\t\s]/gi, '');
  return cssString;
};
