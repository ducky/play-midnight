import React from 'react';
import isPlainObject from 'lodash/isPlainObject';

import getCssString from 'utils/getCssString';

const createStylesheet = creator => accentColor => {
  const styles = creator(accentColor);

  // Array, assuming single stylesheet
  if (!isPlainObject(styles)) {
    return () => <style>{getCssString(styles)}</style>;
  }

  // Object, assuming multiple sheets
  const stylesheets = {};

  Object.keys(styles).forEach(id => {
    const style = styles[id];
    stylesheets[id] = () => <style>{getCssString(style)}</style>;
  });

  return stylesheets;
};

export default createStylesheet;
