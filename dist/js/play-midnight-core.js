/*global Promise, chrome, PlayMidnightUtilities */
// _ references Utilities
var PlayMidnight = (function(_){
	'use strict';

	// Our Friend
	var PM = {};

	// Dev Mode: Use CSS File rather than inline <style> (inline allows dynamic accent colors)
	var _dev = true;

	var VERSION_NUMBER = '2.0.3';

	// Reset Options when version less than
	var _resetOptions = '2.0.1';

	// All Options Defined
	var _optionsGraph = {};
	_.$http.get(chrome.extension.getURL('dist/options.json'))
		.then(function(options) {
			_optionsGraph = options;
			console.log(_optionsGraph);
		});

	// Default Options
	var _options = {
		version: VERSION_NUMBER,
		enabled: true,
		lastRun: null,
		favicon: true,
		verbose: false,
		accent: {
			'name': 'Blue Abyss',
			'color': '#3179a1'
		},
		accents: [
			{
				'name': 'Play Music (Default)',
				'color': '#fb8521'
			},
			{
				'name': 'Blue Abyss',
				'color': '#3179a1'
			}
		]
	};


	// Favicon Attributes
	var _favicon = {
		// Load Newest Icon with Timestamp to prevent Caching
		url: chrome.extension.getURL('dist/images/favicon.ico') + '?v=' + Date.now()
	};


	// Stylesheets
	var _stylesheets = {
		main: {
			url: chrome.extension.getURL('dist/css/play-midnight.css'),
			html: ''
		},

		options: {
			url: chrome.extension.getURL('dist/css/play-midnight-options.css'),
			html: ''
		}
	};


	// Replace Rules
	var _replaceRules = [
		{
			name: 'Accent Color',
			regex: /("|')\{COLOR_ACCENT\}("|')/g,
			replace: function() {
				return _options.accent.color;
			}
		}
	];



	// Load User Options from Chrome Storage
	function loadOptions(cb) {
		chrome.storage.sync.get(_options, function(options) {
			checkUpdated(options, cb);
		});
	}



	// Check if Play Midnight has Updated, Reset options if needed
	function checkUpdated(options, cb) {
		// No Version Found (< v2.0.0)
		if (options.version === undefined) {
			console.log('PLAY MIDNIGHT: No Current Options Found, Resetting to Default');

			chrome.storage.sync.set(_options, function() {
				if (cb && typeof cb === 'function') {
					cb();
				}
			});

		// Version Older Than Required Reset (For Resetting to add new options)
		} else if (_.versionCompare(options.version, _resetOptions) === -1) {
			console.log('PLAY MIDNIGHT: Outdated Options, Resetting Some (User Version: %s, Required Version: %s)', options.version, _resetOptions);

			for (var key in _options) {
				if (options[key] === undefined) {
					console.log('Setting %s to default: %s', key, JSON.stringify(_options[key]));
					options[key] = _options[key];
				} else {
					console.log('Skipping %s, User Value: %s', key, JSON.stringify(options[key]));
				}
			}

			chrome.storage.sync.set(options, function() {
				if (cb && typeof cb === 'function') {
					cb();
				}
			});

		// Update Version Number
		} else if (_.versionCompare(options.version, VERSION_NUMBER) === -1) {
			console.log('PLAY MIDNIGHT: Updated to version %s', VERSION_NUMBER);
			chrome.storage.sync.set({ version: VERSION_NUMBER }, function() {
				_options.version = VERSION_NUMBER;
				if (cb && typeof cb === 'function') {
					cb();
				}
			});

		// Options All Good
		} else {
			_options = options;
			if (cb && typeof cb === 'function') {
				cb();
			}
		}
	}




	// Inject Stylesheet
	function injectStyle() {
		var promises = [];

		function doInject() {
			var link, rule;

			// Inject Stylesheet as <link>
			if (_dev) {
				_.log('DEV MODE ENABLED: Using <link> tag');
				link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';

				for (var key in _stylesheets) {
					if (_stylesheets.hasOwnProperty(key)) {
                        var temp = link.cloneNode();

						console.log(temp);

						temp.href = _stylesheets[key].url;
						document.head.appendChild(temp);
                    }
                }

				return;
			}

			// _.log('DEV MODE DISABLED: Using <style> tag');
			// // Run Replace Rules
			// for (var i = 0, len = _replaceRules.length; i < len; i++) {
			// 	rule = _replaceRules[i];
			// 	_stylesheet.html = _stylesheet.html.replace(rule.regex, rule.replace());
			// }
			//
			// // Inject Stylesheet as <style>
			// styles = document.createElement('styles');
			// styles.id = 'play-midnight-stylesheet';
			// styles.type = 'text/css';
			// styles.innerHTML = _stylesheet.html;
			//
			// document.head.appendChild(styles);
		}

		for (var key in _stylesheets) {
			if (_stylesheets.hasOwnProperty(key)) {
				promises.push(
					_.$http.get(_stylesheets[key].url)
				);
			}
		}

		Promise.all(promises)
            .then(function(stylesheets) {
				var i = 0;
				for (var key in _stylesheets) {
					if (_stylesheets.hasOwnProperty(key)) {
                        _stylesheets[key].html = stylesheets[i] || '';
                        i++;
                    }
                }

				doInject();
			});
	}



	// Update Favicon
	function updateFavicon() {
		if (!_options.favicon) {
			return;
		}

		var icon = document.createElement('link');

		// Remove Old Favicon
		var current = document.querySelectorAll('link[rel="SHORTCUT ICON"]');
		_.remove(current);

		icon.rel = 'shortcut icon';
		icon.href = _favicon.url;

		document.head.appendChild(icon);
	}



	// Display Notification if new one exists
	function checkNotification() {
		var notificationUrl;

		// First Run
		if (_options.lastRun === undefined || _options.lastRun === null) {
			notificationUrl = chrome.extension.getURL('dist/templates/notifications/default.html');

        // New Version
		} else if (_.versionCompare(_options.lastRun, VERSION_NUMBER) < 0) {
			notificationUrl = chrome.extension.getURL('dist/templates/notifications/' + VERSION_NUMBER + '.html');

        // Current Version
		} else {
			_.log('Already on Current Version (v%s), Skipping Modal', _options.lastRun);
			return;
		}

		_.$http.get(notificationUrl).then(function(template) {
			_.log('Show notification for version: %s', VERSION_NUMBER);
			PM.Modal.show(template, function() {
				// chrome.storage.sync.set({ lastRun: VERSION_NUMBER }, function() {
				// 	_options.lastRun = VERSION_NUMBER;
				// });
			});
		}).catch(function() {
			_.log('No notification template exists for version: %s', VERSION_NUMBER);
			chrome.storage.sync.set({ lastRun: VERSION_NUMBER }, function() {
				_options.lastRun = VERSION_NUMBER;
			});
		});
	}




	// Configuration
	function config() {
		_.setVerbose(_options.verbose || _dev);

		if (_.verbose()) {
			_.log('PLAY MIDNIGHT: Verbose Mode ENABLED');
			_.log('===========================================');
			_.log('PLAY MIDNIGHT: Loaded User Options');

			for (var key in _options) {
				if (_options.hasOwnProperty(key)) {
					_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(_options[key]));
				}
			}

			chrome.storage.onChanged.addListener(function(changes) {
				_.log('PLAY MIDNIGHT: Option Changed!');

				for (var key in changes) {
					if (changes.hasOwnProperty(key)) {
						_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(changes[key]));
					}
				}
			});
		}
	}




	// Yay Initialize!
	function init() {
		loadOptions(function() {
			config();
			injectStyle();

			window.addEventListener('load', function() {
				PM.Options.create();
				updateFavicon();
				checkNotification();
			});
		});
	}



	// Expose to Outside World
	PM.version = VERSION_NUMBER;
	PM.options = _options;
	PM.optionsShown = false;
    PM.init = init;


	// Return Object for Modularity
	return PM;
})(PlayMidnightUtilities);
