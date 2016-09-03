/* global self, chrome */
var PlayMidnightBrowser = (function () {
  'use strict';

  // Our Friend
  var BR = {};

  // Get Browser
  var _browser = 'chrome';

  BR.isFireFox = function () {
    return _browser === 'firefox';
  };

  BR.isChrome = function () {
    return _browser === 'chrome';
  };

  // Save To Storage
  BR.save = function (data, cb) {
    if (_browser === 'chrome') {
      chrome.storage.sync.set(data, cb);
    } else {
      self.port.emit('save', data);
      self.port.on('saved', cb);
    }
  };


  // Get From Storage
  BR.get = function (data, cb) {
    if (_browser === 'chrome') {
      chrome.storage.sync.get(data, cb);
    } else {
      self.port.emit('retrieve', data);
      self.port.on('retrieved', cb);
    }
  };


  // Get Full URL
  BR.url = function (url) {
    if (_browser === 'chrome') {
      return chrome.extension.getURL(url);
    } else {
      url = url.replace(/^\//, '');
      return self.options.pluginUrl + url;
    }
  };


  // Option Changed
  BR.changed = function (cb) {
    if (_browser === 'chrome') {
      return chrome.storage.onChanged.addListener(cb);
    } else {
      return;
    }
  };


  // Return Object for Modularity
  return BR;
})();
