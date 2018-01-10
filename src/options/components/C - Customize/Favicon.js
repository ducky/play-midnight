import { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';

import { getUrl, loadBackground } from 'lib/api';
import { selectors } from 'modules/options';
import removeAllElements from 'utils/removeAllElements';
import withOptions from 'hoc/withOptions';

import FaviconImage from 'assets/images/favicon.png';
import injectElement from 'utils/injectElement';

const OPTION_ID = 'favicon';
const ICON_STORAGE = 'PM_ICON';

const mapStateToProps = state => ({
  accent: selectors.accentColor(state),
  options: selectors.options(state),
});

@withOptions
@connect(mapStateToProps)
class Favicon extends Component {
  updateFavicon = async (accent, useAccent) => {
    const stored = localStorage.getItem(ICON_STORAGE) ? JSON.parse(localStorage.getItem(ICON_STORAGE)) : undefined;

    const cached = stored && stored.accent === accent.value;
    const data = {
      url: getUrl(FaviconImage),
      accent: accent.value,
    };

    const createIcon = href => {
      // Remove Old Favicon
      removeAllElements('link[rel="SHORTCUT ICON"], link[rel="shortcut icon"], link[rel="icon"], link[href $= ".ico"]');

      // Create Link Element
      injectElement('link', { id: `play-midnight-${OPTION_ID}`, rel: 'icon', type: 'image/png', href }, 'head');
    };

    if (!useAccent) {
      return createIcon(data.url);
    } else {
      if (cached) {
        createIcon(stored.url);
      } else {
        const { url, accent } = await loadBackground(data);
        localStorage.setItem(
          ICON_STORAGE,
          JSON.stringify({
            url,
            accent,
          })
        );
        createIcon(url);
      }
    }
  };

  shouldComponentUpdate({ accent: prevAccent, options: prevOptions }) {
    const { accent, options } = this.props;
    const prevFavicon = filter(prevOptions, o => ['favicon', 'faviconAccent'].includes(o.id));
    const favicon = filter(options, o => ['favicon', 'faviconAccent'].includes(o.id));

    return !isEqual(prevAccent, accent) || !isEqual(prevFavicon, favicon);
  }

  render() {
    const { accent, isActive } = this.props;
    const accented = isActive('faviconAccent');

    if (isActive('favicon')) this.updateFavicon(accent, accented);

    return null;
  }
}

export default Favicon;
