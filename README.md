## Play Midnight - Chrome Extension

[![Install now.](https://img.shields.io/badge/chrome%20web%20store-download-blue.svg)](https://chrome.google.com/webstore/detail/play-midnight-for-google/ljmjmhjkcgfmfdhgplikncgndbdeckci)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/d/ljmjmhjkcgfmfdhgplikncgndbdeckci.svg)](https://chrome.google.com/webstore/detail/play-midnight-for-google/ljmjmhjkcgfmfdhgplikncgndbdeckci)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/ljmjmhjkcgfmfdhgplikncgndbdeckci.svg)](https://chrome.google.com/webstore/detail/play-midnight-for-google/ljmjmhjkcgfmfdhgplikncgndbdeckci)
&nbsp;&nbsp;|&nbsp;&nbsp;
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/datducky)
[![Donate](https://img.shields.io/badge/Donate-Coinbase-green.svg)](https://www.coinbase.com/christieman)

### A Nighttime Theme for Google Play Music

Play Midnight is a different take on the standard theme that is used on Google Play Music. As much as I love the original look of Play, the brightness can hurt the eyes after a while. After noticing there wasn't a dark alternative Play Midnight came to be.

### Developing

Play Midnight is currently running using Node.js/Parcel bundler. You'll have to follow these few steps and you should be up and running.

1. Clone Repository
1. Optionally install `yarn` if you don't have it yet.
   * `brew install yarn` if you have homebrew, or `npm install -g yarn`
1. `cd` into the directory and run `yarn` (or `npm install`)

##### Core Updates

1. To build work on core changes, run `yarn start` (or `npm run start`) and it should process everything.
1. In your browser, if you visit `localhost:1234` you'll have a little sandbox you can use for testing core related features
1. This script will recompile automatically so you can just refresh on save.

##### Play Music Updates

1. To build changes for Play Music, you'll need to run `yarn build` after you're ready to test it.
1. In Chrome, go to `chrome://extensions` and toggle the Developer Mode` option (top right) to "On"
1. Click `Load Unpacked Extension` and load up your main Play Midnight folder (the one containing `manifest.json`)
1. Make changes at your leisure! Note: You'll have to click refresh (or Ctrl/Cmd + R) to reload the extension on the `chrome:extensions` page if you rebuild.

### About

The Chrome Extension for Play Midnight uses CSS stored inside the `src/style/sheets/` folder. These files have a theme (from `src/style/theme.js`) injected into them where you have access to the users current Background/Accent colors.

### License

The MIT License (MIT)

Copyright (c) 2016 Chris Tieman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
