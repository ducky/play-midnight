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

Play Midnight is currently using a `gulp` setup, so getting started is relatively easy. You'll have to follow these few steps and you should be up and running:

1. Clone Repository
2. Install Dependencies
  1. Optionally install yarn if you don't have it yet `npm install -g yarn`
  2.  `cd` into the directory and run `yarn` (or `npm install` if you don't want to use yarn)
3. Build Changes
  1. To build your changes, run `npm run build` and it should process everything.
  2. To watch all files for changes (easier), run `npm run watch`
4. In Chrome, go to `chrome://extensions` and toggle the `Developer Mode` option (top right) to "On"
5. Click `Load Unpacked Extension` and load up your main Play Midnight folder (the one containing `manifest.json`)
6. Make changes at your leisure!

**Note:** If you're on Windows and are having any issues with `node-sass` you may need to install python (I've been using `v2.7.12`) and alternatively MSBUILD which comes with Visual Studio Express.

### About

The Chrome Extension for Play Midnight uses CSS generated via SASS for the different color options. These files are all self-contained in the /sass folder and should be commented somewhat to help you understand where each of the settings are.

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
