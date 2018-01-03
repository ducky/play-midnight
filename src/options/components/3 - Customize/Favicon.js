import { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';

import { getUrl, loadBackground } from 'lib/api';
import { selectors } from 'modules/options';
import isOptionActive from 'options/isOptionActive';
import removeAllElements from 'utils/removeAllElements';

import FaviconImage from 'assets/images/favicon.png';
import getInjectedElement from 'utils/getInjectedElement';

const OPTION_ID = 'favicon';
const ICON_STORAGE = 'PM_ICON';

// // Update Favicon
// function updateFavicon() {
//   if (!_userOptions.favicon && !_userOptions.faviconAccent) {
//     return;
//   }

//   var stored = localStorage.getItem('PM_ICON')
//     ? JSON.parse(localStorage.getItem('PM_ICON'))
//     : undefined;
//   var cached = stored && stored.color === _userOptions.accent.color;
//   var data = {
//     url: _favicon.url,
//     color: _userOptions.accent.color
//   };

//   if (_userOptions.faviconAccent) {
//     if (!cached) {
//       chrome.runtime.sendMessage(data, function(response) {
//         localStorage.setItem(
//           'PM_ICON',
//           JSON.stringify({
//             url: response.url,
//             color: _userOptions.accent.color
//           })
//         );
//         createIcon(response.url);
//       });
//     } else {
//       createIcon(stored.url);
//     }
//   } else {
//     createIcon(data.url);
//   }

//   function createIcon(url) {
//     // Remove Old Favicon
//     var current = document.querySelectorAll(
//       'link[rel="SHORTCUT ICON"], link[rel="shortcut icon"], link[rel="icon"], link[href $= ".ico"]'
//     );
//     _.remove(current);

//     // Create Link Element
//     var icon = document.createElement('link');
//     icon.rel = 'icon';
//     icon.type = 'image/png';
//     icon.href = url;

//     document.head.appendChild(icon);
//   }
// }

const mapStateToProps = state => ({
  accent: selectors.accentColor(state),
  options: selectors.options(state)
});

@connect(mapStateToProps)
class Favicon extends Component {
  static id = OPTION_ID;

  updateFavicon = async (accent, useAccent) => {
    console.log('update!', accent, useAccent);
    const stored = localStorage.getItem(ICON_STORAGE)
      ? JSON.parse(localStorage.getItem(ICON_STORAGE))
      : undefined;

    const cached = stored && stored.accent === accent.value;
    const data = {
      url: getUrl(FaviconImage),
      accent: accent.value
    };

    const createIcon = href => {
      // Remove Old Favicon
      const existing = document.querySelectorAll(
        'link[rel="SHORTCUT ICON"], link[rel="shortcut icon"], link[rel="icon"], link[href $= ".ico"]'
      );
      removeAllElements(existing);

      // Create Link Element
      getInjectedElement(
        'link',
        { id: 'play-midnight-favicon', rel: 'icon', type: 'image/png', href },
        'head'
      );
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
            accent
          })
        );
        createIcon(url);
      }
    }
  };

  shouldComponentUpdate({ accent: prevAccent, options: prevOptions }) {
    const { accent, options } = this.props;
    const prevFavicon = filter(prevOptions, o =>
      ['favicon', 'faviconAccent'].includes(o.id)
    );
    const favicon = filter(options, o =>
      ['favicon', 'faviconAccent'].includes(o.id)
    );

    return !isEqual(prevAccent, accent) || !isEqual(prevFavicon, favicon);
  }

  componentWillUnmount() {
    const icon = getInjectedElement('link', { id: 'play-midnight-favicon' });
    icon.remove();
  }

  render() {
    const { accent, options } = this.props;
    const accented = isOptionActive(options, 'faviconAccent');

    this.updateFavicon(accent, accented);

    return null;
  }
}

export default Favicon;
