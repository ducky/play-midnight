import { Component } from 'react';
import { connect } from 'react-redux';
import Vibrant from 'node-vibrant';
import forIn from 'lodash/forIn';

import withOptions from 'hoc/withOptions';

import awaitElement from 'utils/awaitElement';
import { actions, selectors } from 'modules/options';

const colorDebug = (swatches, src) => {
  let str = '';
  let colors = [];

  forIn(swatches, (swatch, key) => {
    if (swatch) {
      str += `%c${key} `;
      colors.push(`color: ${swatch.getHex()}; font-weight: 700; font-family: Helvetica;`);
    }
  });

  console.log('%c   ', `font-size: 80px; background: url(${src}) no-repeat; background-size: 90px 90px;`);
  console.log(str, ...colors);
};

const mapStateToProps = state => ({
  alternateAccent: selectors.alternateAccent(state),
});

@withOptions
@connect(mapStateToProps, { updateAlternateAccent: actions.updateAlternateAccent })
class Core extends Component {
  // Use Vibrant to generate a palette from image src
  getImageAccent = async src => {
    const swatches = await Vibrant.from(src).getPalette();

    // colorDebug(swatches, src);

    if (!swatches) {
      return null;
    } else if (swatches.Vibrant) {
      return swatches.Vibrant.getHex();
    } else if (swatches.LightVibrant) {
      return swatches.LightVibrant.getHex();
    } else if (swatches.Muted) {
      return swatches.Muted.getHex();
    } else if (swatches.DarkVibrant) {
      return swatches.DarkVibrant.getHex();
    }

    return null;
  };

  // Watch img src, use cached accent or regenerate if new image
  observe = async () => {
    this.albumArt = await awaitElement('img#playerBarArt');

    if (this.src !== this.albumArt.src) {
      this.src = this.albumArt.src;
      this.accent = await this.getImageAccent(this.albumArt.src);
      this.props.updateAlternateAccent(this.accent);
    } else if (this.accent) {
      if (this.accent === this.props.alternateAccent) return;
      this.props.updateAlternateAccent(this.accent);
    }
  };

  // Setup observer for the song info section of player
  enable = async () => {
    if (this.songInfoObserver) return;

    this.songInfo = await awaitElement('#playerSongInfo');
    this.songInfoObserver = new MutationObserver(this.observe);
    this.songInfoObserver.observe(this.songInfo, { childList: true, subtree: true });
    this.observe();
  };

  // Kill observer, set accent to null
  disable = () => {
    if (this.songInfoObserver) this.songInfoObserver.disconnect();

    this.props.updateAlternateAccent(null);
    this.songInfoObserver = null;
  };

  // Only update when option changes
  shouldComponentUpdate({ options: nextOptions }) {
    const { options } = this.props;
    return options.albumAccents !== nextOptions.albumAccents;
  }

  // Invoke Enable/Disable on options change
  componentWillReceiveProps({ options: nextOptions }) {
    const { options } = this.props;

    // Prevent unnecessary action on disable
    if (options.albumAccents === nextOptions.albumAccents) return;

    if (!nextOptions.albumAccents) {
      this.disable();
    } else {
      this.enable();
    }
  }

  render() {
    return null;
  }
}

export default Core;
