import stylis from 'stylis';

export default (css = []) => {
  const flatCSS = css.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments
  return stylis('', flatCSS);
};
