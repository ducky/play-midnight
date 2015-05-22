var PlayMidnightUtilities = (function(){
	'use strict';

	// Our Friend
	var PMUtils = {};

	var _verbose = false;


	// Check if Verbose
	PMUtils.verbose = function() {
		return _verbose;
	};


	// Set Verbose
	PMUtils.setVerbose = function(verbose) {
		_verbose = verbose;
	};


	// Log to console if verbose
	PMUtils.log = function() {
		if (_verbose) {
			console.log.apply(console, arguments);
		}
	};


	// Sample stub $http Utility
	PMUtils.$http = function(){
		var core = {
			ajax : function (method, url, args) {
				var promise = new Promise(function (resolve, reject) {
					var client = new XMLHttpRequest();
					var uri = url;

					client.open(method, uri);
					client.send();

					client.onload = function () {
						if (this.status == 200) {
							resolve(this.response);
						} else {
							reject(this.statusText);
						}
					};

					client.onerror = function () {
						reject(this.statusText);
					};
				});

				return promise;
			}
		};

		return {
			'get' : function(url) {
				return core.ajax('GET', url);
			}
		};
	}();


	// Empty Node
	PMUtils.empty = function(element) {
		while (element.lastChild) {
		    element.removeChild(element.lastChild);
		}
	};


	// Check if Nodes Match
	PMUtils.nodesMatch = function(element, target) {
		while (element) {
			if (element === target) {
				return true;
			}
			element = element.parentNode;
		}

		return false;
	};
	// Alias for Nodes Match
	PMUtils.isClicked = PMUtils.nodesMatch;


	// Remove Element from DOM
	PMUtils.remove = function(element) {
		var ele;

		if (isNodeList(element)) {
			for (var i = 0, len = element.length; i < len; i++) {
				ele = element[i];

				if (ele.parentNode) {
					ele.parentNode.removeChild(ele);
				}
			}
		} else {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
		}
	};


	// Insert Element After Node
	PMUtils.insertAfter = function(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	};


	// Create Element from html string
	PMUtils.createElement = function(html) {
		var temp = document.createElement('div');

		temp.innerHTML = html;
		return temp.childNodes[0];
	};


	// Return Comparison of version compare
	// -1: a < b
	// 0: a === b
	// 1: a > b
	PMUtils.versionCompare = function(a, b) {
		if (a === b) {
			return 0;
		}

		var a_components = a.split(".");
		var b_components = b.split(".");

		var len = Math.min(a_components.length, b_components.length);

		for (var i = 0; i < len; i++) {
			if (parseInt(a_components[i]) > parseInt(b_components[i])) {
				return 1;
			}

			if (parseInt(a_components[i]) < parseInt(b_components[i])) {
				return -1;
			}
		}

		if (a_components.length > b_components.length) {
			return 1;
		}

		if (a_components.length < b_components.length) {
			return -1;
		}

		return 0;
	};


	//
	// Private Helpers
	//

	// Check if node is a nodeList
	function isNodeList(nodes) {
		var stringRepr = Object.prototype.toString.call(nodes);

		return typeof nodes === 'object' &&
			/^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
			nodes.hasOwnProperty('length') &&
			(nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
	}


	// Return Object for Modularity
	return PMUtils;
})();

var PlayMidnightInjector = (function(_){
    'use strict';

    // Our Friend
    var PMInjector = {};


    // Load Options Templates and Inject
    function loadTemplates(_temps, cb) {
        var promises = [],
            templates = [],
            template;

        // Array Of Templates
        if (Array.isArray(_temps) && _temps.length > 0) {
            // Load Up Promises
            for (var i = 0, len = _temps.length; i < len; i++) {
                if (!_temps[i] || !_temps[i].hasOwnProperty('url')) {
                    continue;
                }

                promises.push(
                    _.$http.get(_temps[i].url)
                );
            }

            // No Templates had URLS
            if (!promises.length) {
                if (typeof cb === 'function') {
                    cb(templates);
                }
                return;
            }

            // Load ALL Templates before injecting
            Promise.all(promises)
                .then(function(templateHtml) {
                    // Populate Returned Templates
                    for (var i = 0, len = _temps.length; i < len; i++) {
                        template = _temps[i];

                        templates.push({
                            url: template.url,
                            target: template.target || 'body',
                            events: template.events || function() {},
                            html: templateHtml[i] || '',
                            element: _.createElement(templateHtml[i]) || document.createElement('div')
                        });
                    }

                    if (typeof cb === 'function') {
                        _.log(templates);
                        cb(templates);
                    }
                });

        // Single Template
        } else {
            // No Template or Template URL
            if (!_temps || !_temps.hasOwnProperty('url')) {
                if (typeof cb === 'function') {
                    cb(templates);
                }
                return;
            }

            // Load Single Template
            _.$http.get(_temps.url)
                .then(function(templateHtml) {
                    templates.push({
                        url: _temps.url,
                        target: _temps.target || 'body',
                        events: _temps.events || function() {},
                        html: templateHtml || '',
                        element: _.createElement(templateHtml) || document.createElement('div')
                    });

                    if (typeof cb === 'function') {
                        cb(templates);
                    }
                });
        }
    }


    // Load Options Templates and Inject
    function injectTemplates(_temps, cb) {
        var target,
            template;

        _.log('Starting Load Templates: %s', JSON.stringify(_temps));
        loadTemplates(_temps, function(templates) {
            _.log('Injecting Templates');

            if (!templates.length) {
                _.log('No Templates loaded?');
            }

            for (var i = 0, len = templates.length; i < len; i++) {
                template = templates[i];

                target = document.querySelector(template.target);
                target.appendChild(template.element);

                // Register Events, If Given
                if (typeof template.events === 'function') {
                    template.events(template.element);
                }
            }

            if (typeof cb === 'function') {
                cb(templates);
            }
        });
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

        return _.createElement(template);
    }


    // Add to utils
    _.inject = injectTemplates;


    // Return Object for Modularity
    return PMInjector;
})(PlayMidnightUtilities);

var PlayMidnightModal = (function(_){
	'use strict';

	// Our Friend
	var PMModal = {};

	var _injected = false,
		_backdrop = document.createElement('div'),
		_modal = document.createElement('div'),
		_cb;

	// Setup
	_backdrop.id = 'play-midnight-modal-backdrop';
	_modal.id = 'play-midnight-modal';



	// Show Modal
	PMModal.show = function(templateHtml, cb) {
		var template = parseTemplate(templateHtml);

		_cb = cb;

		injectModal();

		_.empty(_modal);
		_modal.appendChild(template);

		document.body.classList.add('modal-show');

		_modal.querySelector('.confirm-btn').addEventListener('click', function(e) {
			e.preventDefault();

			document.body.classList.remove('modal-show');
			if (typeof _cb === 'function' && _cb) {
				_cb();
			}
		});
	};




	// Hide Modal
	PMModal.hide = function() {
		_backdrop.classList.remove('modal-show');
		if (typeof _cb === 'function' && _cb) {
			_cb();
		}
	};




	// Inject Modal to DOM
	function injectModal() {
		if (_injected || document.body.contains(_backdrop) || document.body.contains(_modal)) {
			return;
		}

		document.body.appendChild(_modal);
		document.body.appendChild(_backdrop);

		_injected = true;

		// Trigger Window getting styles for css3
		return window.getComputedStyle(_backdrop).height;
	}




	// Parse Template html to fix relative paths
	function parseTemplate(template) {
		template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));
		//template = template.replace(/\{VERSION_NUMBER\}/, VERSION_NUMBER);

		return _.createElement(template);
	}



	// Return Object for Modularity
	return PMModal;
})(PlayMidnightUtilities);

var PlayMidnightOptions = (function(_){
    'use strict';

    // Our Friend
    var PMOptions = {};

    var _injected = false,
        _menuOpen = false,
        _backdrop = document.createElement('div'),
        _modal = document.createElement('div'),
        _cb;


    // Various Templates
    var _templates = [];

    _templates.push({
        name: 'optionsPage',
        url: chrome.extension.getURL('dist/templates/options.html'),
        target: 'body'
    });

    _templates.push({
        name: 'menuItem',
        url: chrome.extension.getURL('dist/templates/options-menu.html'),
        target: '#nav_collections',
        events: function(ele) {
            ele.addEventListener('click', function(e) {
                // Prevent Click Bubbling to Document
                if (!_menuOpen) {
                    e.stopPropagation();
                }

                showOptions();
            }, false);
        }
    });


    // Load Options Templates and Inject
    function createOptions() {
        _.inject(_templates, function(injected) {
            // for (var i = 0, len = injected.length; i < len; i++) {
            //     template = injected[i];
            // }
        });
    }


    // Listener for Document.click when Menu is open
    function handleClick(e) {
        if (_menuOpen &&!_.isClicked(e.target, _templates.optionsPage.element)) {
            hideOptions();
        }
    }


    // Show Options Page
    function showOptions() {
        document.addEventListener('click', handleClick, false);
        _templates.optionsPage.element.classList.add('visible');
        _menuOpen = true;
    }


    // Hide Options Page
    function hideOptions() {
        document.removeEventListener('click', handleClick);
        _templates.optionsPage.element.classList.remove('visible');
        _menuOpen = false;
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

        return _.createElement(template);
    }


    // Add Options to Object
    PMOptions.create = createOptions;
    PMOptions.show = showOptions;
    PMOptions.hide = hideOptions;


    // Return Object for Modularity
    return PMOptions;
})(PlayMidnightUtilities);

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
