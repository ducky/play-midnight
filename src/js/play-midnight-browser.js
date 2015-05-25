/* global chrome, firefox */
var PlayMidnightBrowser = (function(){
	'use strict';

	// Our Friend
	var BR = {};

	// Get Browser
    var _browser = (chrome !== undefined) ? 'chrome' : 'firefox';

	// Save To Storage
	BR.save = function(data, cb) {
        if (_browser === 'chrome') {
            chrome.storage.sync.set(data, cb);
        } else {
            // Firefox
            return;
        }
	};


	// Get From Storage
	BR.get = function(data, cb) {
        if (_browser === 'chrome') {
            chrome.storage.sync.get(data, cb);
        } else {
            // Firefox
            return;
        }
	};


	// Get Full URL
	BR.url = function(url) {
        if (_browser === 'chrome') {
            return chrome.extension.getURL(url);
        } else {
            // Firefox
            return;
        }
	};


	// Return Object for Modularity
	return BR;
})();
