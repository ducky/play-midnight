import { Component } from 'react';
import { connect } from 'react-redux';
import Vibrant from 'node-vibrant';

import withOptions from 'hoc/withOptions';

import awaitElement from 'utils/awaitElement';
import { actions, selectors } from 'modules/options';

const mapStateToProps = state => ({
  alternateAccent: selectors.alternateAccent(state),
});

@withOptions
@connect(mapStateToProps, { updateAlternateAccent: actions.updateAlternateAccent })
class Core extends Component {
  // Use Vibrant to generate a palette from image src
  getImageAccent = async src => {
    const swatches = await Vibrant.from(src).getPalette();

    if (!swatches) {
      return null;
    } else if (swatches.Vibrant) {
      return swatches.Vibrant.getHex();
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
  componentWillReceiveProps({ options }) {
    if (!options.albumAccents) {
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
