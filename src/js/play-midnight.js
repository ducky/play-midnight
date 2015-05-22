// _ references Utilities
var PlayMidnight = (function(_, PMOptions, PMModal){
	'use strict';

	// Our Friend
	var PM = {};

	// Dev Mode: Use CSS File rather than inline <style> (inline allows dynamic accent colors)
	var _dev = false;

	var VERSION_NUMBER = '2.0.1';

	// Reset Options when version less than
	var _resetOptions = '2.0.1';

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


	// Stylesheet Attributes
	var _stylesheet = {
		url: chrome.extension.getURL('dist/css/play-midnight.css'),
		html: ''
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
		function doInject() {
			var style, rule;

			// Inject Stylesheet as <link>
			if (_dev) {
				_.log('DEV MODE ENABLED: Using <link> tag');
				style = document.createElement('link');

				style.rel = 'stylesheet';
				style.type = 'text/css';
				style.href = _stylesheet.url;

				document.head.appendChild(style);

				return;
			}

			_.log('DEV MODE DISABLED: Using <style> tag');
			// Run Replace Rules
			for (var i = 0, len = _replaceRules.length; i < len; i++) {
				rule = _replaceRules[i];
				_stylesheet.html = _stylesheet.html.replace(rule.regex, rule.replace());
			}

			// Inject Stylesheet as <style>
			style = document.createElement('style');
			style.id = 'play-midnight-stylesheet';
			style.type = 'text/css';
			style.innerHTML = _stylesheet.html;

			document.head.appendChild(style);
		}

		_.$http.get(_stylesheet.url).then(function(html) {
			_stylesheet.html = html;
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

		if (_.versionCompare(_options.lastRun, VERSION_NUMBER) > -1) {
			_.log('Already on Current Version (v%s), Skipping Modal', _options.lastRun);
			return;
		}

		// First Run
		if (_options.lastRun === undefined || _options.lastRun === null) {
			notificationUrl = chrome.extension.getURL('dist/templates/notifications/default.html');
		} else if (_.versionCompare(_options.lastRun, VERSION_NUMBER) === -1) {
			notificationUrl = chrome.extension.getURL('dist/templates/notifications/' + VERSION_NUMBER + '.html');
		}

		_.$http.get(notificationUrl).then(function(template) {
			_.log('Show notification for version: %s', VERSION_NUMBER);
			PMModal.show(template, function() {
				chrome.storage.sync.set({ lastRun: VERSION_NUMBER }, function() {
					_options.lastRun = VERSION_NUMBER;
				});
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
				_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(_options[key]));
			}

			chrome.storage.onChanged.addListener(function(changes) {
				_.log('PLAY MIDNIGHT: Option Changed!');

				for (var key in changes) {
					_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(changes[key]));
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
				//PMOptions.create();
				updateFavicon();
				checkNotification();
			});
		});
	}



	// Load Play Midnight
	init();


	// Expose to Outside World
	PM.version = VERSION_NUMBER;
	PM.options = _options;
	PM.optionsShown = false;


	// Return Object for Modularity
	return PM;
})(PlayMidnightUtilities, PlayMidnightOptions, PlayMidnightModal);
