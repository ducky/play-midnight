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

/* global PlayMidnightBrowser, Promise */
var PlayMidnightUtilities = (function(Browser){
	'use strict';

	// Our Friend
	var PMUtils = {};

	var _verbose = false;

	// Add Browser Save/Get/URL Tools
	PMUtils.browser = Browser;

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
						if (this.status === 200) {
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


	// Check (Vaguely) for Object equality
	PMUtils.equalObjects = function(a, b) {
		if (typeof a !== 'object' || typeof b !== 'object') {
			return false;
		}

	    var aProps = Object.getOwnPropertyNames(a);
	    var bProps = Object.getOwnPropertyNames(b);

	    if (aProps.length !== bProps.length) {
	        return false;
	    }

	    for (var i = 0; i < aProps.length; i++) {
	        var propName = aProps[i];

	        if (a[propName] !== b[propName]) {
	            return false;
	        }
	    }

	    return true;
	};


	// Title Case
	PMUtils.toTitleCase = function(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};


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


	// Get Parent with class/id
	PMUtils.getParentElement = function(el, search) {
	    while (el.parentNode) {
	        if (el.classList.contains(search) || el.id === search) {
				return el;
			}

	        el = el.parentNode;
	    }

		return document.createElement('div'); // returns an Array []
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


	// Eat Fake Function Call (CSS3 Transitions with getComputedStyle)
	PMUtils.garbage = function() {
		return true;
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
})(PlayMidnightBrowser);

/*global Promise, chrome, PlayMidnightUtilities */
var PlayMidnight = (function(_){
	'use strict';

	// Our Friend
	var PM = {};

	// Dev Mode: Use CSS File rather than inline <style> (inline allows dynamic accent colors)
	var _dev = false;

	var VERSION_NUMBER = '2.1.1';

	// Reset Options when version less than
	var _resetOptions = '2.1.0';

	// Nuke All Options
	var _nukeOptions = '2.1.0';

	// All Options Defined
	var _optionsGraph = {}; // Full Options Tree (options.json)
	var _defaultOptions = {}; // Default Options
	var _userOptions = {}; // User Loaded Options


	// Favicon Attributes
	var _favicon = {
		// Load Newest Icon with Timestamp to prevent Caching
		url: _.browser.url('dist/images/favicon.ico') + '?v=' + Date.now()
	};


	// Stylesheets
	var _stylesheets = {
		main: {
			id: 'play-midnight-stylesheet',
			url: _.browser.url('dist/css/play-midnight.css'),
			html: '',
			enabled: function() {
				return _userOptions.enabled;
			}
		},

		accents: {
			id: 'play-midnight-accents',
			url: _.browser.url('dist/css/play-midnight-accents.css'),
			html: '',
			enabled: function() {
				return (_userOptions.enabled === false && _userOptions.accentsOnly);
			}
		},

		options: {
			id: 'play-midnight-options',
			url: _.browser.url('dist/css/play-midnight-options.css'),
			html: ''
		}
	};


	// Replace Rules
	var _replaceRules = [
		{
			name: 'Accent Color',
			regex: /\#fb8521/gi,
			replace: function() {
				return _userOptions.accent.color;
			}
		}
	];



	// Load User Options from Chrome Storage
	function loadOptions(cb) {
		_.$http.get(_.browser.url('dist/options.json'))
			.then(function(options) {
				_optionsGraph = JSON.parse(options);
				_defaultOptions = parseOptions(_optionsGraph);

				_.log('Default Options Loaded');
				for (var key in _defaultOptions) {
					if (_defaultOptions.hasOwnProperty(key)) {
						_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(_defaultOptions[key]));
					}
				}

				_.browser.get(_defaultOptions, function(options) {
					checkUpdated(options, cb);
				});
			});
	}


	// Parse Options
	function parseOptions(options, _parsed) {
		var option, rules;

		_parsed = _parsed || {};

		rules = {
			'{VERSION_NUMBER}': VERSION_NUMBER
		};

		for (var key in options) {
			if (options.hasOwnProperty(key)) {
				option = options[key];

				if (option.type === 'section') {
					parseOptions(option.options, _parsed);
				} else if (option.type === 'array') {
					_parsed[option.single] = rules[option.default] || option.default;
					_parsed[key] = option.collection;
				} else {
					if (option.type === 'string' && option.saved === false) {
						continue;
					}

					_parsed[key] = rules[option.default] || option.default;
				}
			}
		}

		return _parsed;
	}


	// Check if Play Midnight has Updated, Reset options if needed
	function checkUpdated(options, cb) {
		var skipped = ['lastRun', 'accent', 'accents', 'queue'];

		// No Version Found (< v2.0.0)
		if (options.version === undefined || _.versionCompare(options.version, _nukeOptions) === -1) {
			if (options.version === undefined) {
				_.log('PLAY MIDNIGHT: No Current Options Found, Setting to Default');
			} else {
				_.log('PLAY MIDNIGHT: Nuking All Options to Default');
			}

			_.browser.save(_defaultOptions, function() {
				_userOptions = _defaultOptions;
				if (cb && typeof cb === 'function') {
					cb();
				}
				return;
			});

		// Version Older Than Required Reset (For Resetting to add new options)
		} else if (_.versionCompare(options.version, _resetOptions) === -1) {
			_.log('PLAY MIDNIGHT: Options Update, Forcing Reset');

			for (var key in _defaultOptions) {
				if (_defaultOptions.hasOwnProperty(key)) {
					if (options[key] === undefined || (Object.prototype.toString.call(options[key]) !== Object.prototype.toString.call(_defaultOptions[key]) && skipped.indexOf(key) === -1)) {
						_.log('Setting %s to default (User: %s, Default: %s)', key, JSON.stringify(options[key]), JSON.stringify(_defaultOptions[key]));
						options[key] = _defaultOptions[key];
					} else {
						_.log('Skipping %s, User Value: %s', key, JSON.stringify(options[key]));
					}
				}
			}

			_.browser.save(options, function() {
				_userOptions = options;
				if (cb && typeof cb === 'function') {
					cb();
				}
				return;
			});

		// Update Version Number
		} else if (_.versionCompare(options.version, VERSION_NUMBER) === -1) {
			_.log('PLAY MIDNIGHT: Updated to version %s', VERSION_NUMBER);

			_.browser.save({ version: VERSION_NUMBER }, function() {
				_userOptions.version = VERSION_NUMBER;
				if (cb && typeof cb === 'function') {
					cb();
				}
				return;
			});

		// Options All Good
		} else {
			_userOptions = options;
			if (cb && typeof cb === 'function') {
				cb();
			}
			return;
		}

		// Something went wrong loading options, set user to default for this Run
		_userOptions = _defaultOptions;
	}




	// Inject Stylesheet
	function injectStyle() {
		var promises = [];

		function doInject() {
			var stylesheet, link, style, replace, rule, key, temp;

			// Inject Stylesheet as <link>
			if (_dev) {
				_.log('DEV MODE ENABLED: Using <link> tag');
				link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';

				for (key in _stylesheets) {
					if (_stylesheets.hasOwnProperty(key)) {
						stylesheet = _stylesheets[key];

						if (stylesheet.hasOwnProperty('enabled') && !stylesheet.enabled()) {
							continue;
						}

                        temp = link.cloneNode();

						temp.href = stylesheet.url;
						document.head.appendChild(temp);
                    }
                }

				return;
			}

			_.log('DEV MODE DISABLED: Using <style> tag');
			style = document.createElement('style');
			style.type = 'text/css';

			for (key in _stylesheets) {
				if (_stylesheets.hasOwnProperty(key)) {
					stylesheet = _stylesheets[key];

					if (stylesheet.hasOwnProperty('enabled') && !stylesheet.enabled()) {
						continue;
					}

					if (_userOptions.enabled || _userOptions.accentsOnly) {
						for (var i = 0, len = _replaceRules.length; i < len; i++) {
							rule = _replaceRules[i];
							replace = rule.replace();

							stylesheet.html = stylesheet.html.replace(rule.regex, replace);
						}
					}

					temp = style.cloneNode();

					temp.id = stylesheet.id;
					temp.innerHTML = stylesheet.html;
					document.head.appendChild(temp);
				}
			}
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
		if (!_userOptions.favicon) {
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


	// Update Queue
	function updateQueue() {
		if (!_userOptions.queue) {
			return;
		}

		document.querySelector('#queue-overlay').classList.add('pm-expanded-queue');
	}


	// Display Notification if new one exists
	function checkNotification() {
		var notificationUrl = _.browser.url('dist/templates/notifications/' + VERSION_NUMBER + '.html');

        // No New Version
		if (typeof _userOptions.lastRun === 'string' && _.versionCompare(_userOptions.lastRun, VERSION_NUMBER) > -1) {
			_.log('Already on Current Version (v%s), Skipping Modal', _userOptions.lastRun);
			return;
		}

		_.$http.get(notificationUrl).then(function(template) {
			_.log('Show notification for version: %s', VERSION_NUMBER);
			PM.Modal.show(template, function() {
				_.browser.save({ lastRun: VERSION_NUMBER }, function() {
					_userOptions.lastRun = VERSION_NUMBER;
				});
			});
		}).catch(function() {
			_.log('No notification template exists for version %s, loading default', VERSION_NUMBER);

			notificationUrl = _.browser.url('dist/templates/notifications/default.html');
			_.$http.get(notificationUrl).then(function(template) {
				_.log('Show Default Notification', VERSION_NUMBER);
				PM.Modal.show(template, function() {
					_.browser.save({ lastRun: VERSION_NUMBER }, function() {
						_userOptions.lastRun = VERSION_NUMBER;
					});
				});
			}).catch(function() {
				_.log('Failed to load Default Notification');
			});
		});
	}




	// Configuration
	function config() {
		_.setVerbose(_userOptions.verbose || _dev);

		if (_.verbose()) {
			_.log('PLAY MIDNIGHT: Verbose Mode ENABLED');
			_.log('===========================================');
			_.log('PLAY MIDNIGHT: Loaded User Options');

			for (var key in _userOptions) {
				if (_userOptions.hasOwnProperty(key)) {
					_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(_userOptions[key]));
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
		_.setVerbose(_dev);

		loadOptions(function() {
			config();
			injectStyle();

			window.addEventListener('load', function() {
				PM.Options.create();
				updateFavicon();
				updateQueue();
				checkNotification();
			});
		});
	}


	function getUserOptions() {
		return _userOptions;
	}

	function getOptionsGraph() {
		return _optionsGraph;
	}

	// Expose to Outside World
	PM.version = VERSION_NUMBER;
	PM.getUserOptions = getUserOptions;
	PM.getOptionsGraph = getOptionsGraph;
    PM.init = init;


	// Return Object for Modularity
	return PM;
})(PlayMidnightUtilities);

/*global Promise, PlayMidnight, PlayMidnightUtilities */
var PlayMidnightInjector = (function(_, PM){
    'use strict';

    // Our Friend
    var PMInjector = {};


    // Load Options Templates and Inject
    function loadTemplates(_temps, cb) {
        var promises = [];

        // Invalid Templates
        if (!_temps || typeof _temps !== 'object') {
            if (typeof cb === 'function') {
                cb(_temps);
            }
            return;
        }

        // Load Up Promises
        for (var key in _temps) {
            if (_temps.hasOwnProperty(key)) {
                if (!_temps[key] || !_temps[key].hasOwnProperty('url')) {
                    continue;
                }

                promises.push(
                    _.$http.get(_temps[key].url)
                );
            }
        }

        // No Templates had URLS
        if (!promises.length) {
            if (typeof cb === 'function') {
                cb(_temps);
            }
            return;
        }

        // Load ALL Templates before injecting
        Promise.all(promises)
            .then(function(templateHtml) {
                // Populate Returned Templates
                var i = 0;
                for (var key in _temps) {
                    if (_temps.hasOwnProperty(key)) {
                        _temps[key].html = parseTemplate(templateHtml[i]) || '';
                        _temps[key].element = _.createElement(_temps[key].html) || document.createElement('div');
                        i++;
                    }
                }

                if (typeof cb === 'function') {
                    cb(_temps);
                }
            });
    }


    // Load Options Templates and Inject
    function injectTemplates(_temps, cb) {
        var target;

        _.log('Starting Load Templates');
        loadTemplates(_temps, function(templates) {
            _.log('Injecting Templates');

            // No Templates?
            if (!templates || typeof templates !== 'object') {
                _.log('No Templates loaded?');
                if (typeof cb === 'function') {
                    cb();
                }
                return;
            }

            for (var key in templates) {
                if (templates.hasOwnProperty(key)) {
                    if (templates[key].hasOwnProperty('enabled') && !templates[key].enabled()) {
                        continue;
                    }

                    target = document.querySelector(templates[key].target);

                    if (templates[key].hasOwnProperty('append')) {
                        target.insertBefore(templates[key].element, target.childNodes[templates[key].append]);
                    } else {
                        target.appendChild(templates[key].element);
                    }
                    _.garbage(window.getComputedStyle(templates[key].element).height);

                    // Register Events, If Given
                    if (typeof templates[key].events === 'function') {
                        templates[key].events(templates[key].element);
                    }
                }
            }

            if (typeof cb === 'function') {
                cb();
            }
        });
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/g, _.browser.url('/dist'));
        template = template.replace(/\{VERSION_NUMBER\}/g, PM.version);

        return template;
    }


    // Add to utils
    _.inject = injectTemplates;


    // Return Object for Modularity
    return PMInjector;
})(PlayMidnightUtilities, PlayMidnight);

/*global PlayMidnightUtilities, PlayMidnight, chrome */
var PlayMidnightModal = (function(_, PlayMidnight){
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
		template = template.replace(/\{CHROME_DIR\}/g, _.browser.url('/dist'));
		template = template.replace(/\{VERSION_NUMBER\}/g, PlayMidnight.version);

		return _.createElement(template);
	}


	// Add To Core
	PlayMidnight.Modal = PMModal;


	// Return Object for Modularity
	return PMModal;
})(PlayMidnightUtilities, PlayMidnight);

/*global PlayMidnightUtilities, PlayMidnight */
var PlayMidnightOptions = (function(_, PlayMidnight){
    'use strict';

    // Our Friend
    var PMOptions = {};

    var _injected = false,
        _menuOpen = false,
        _backdrop = document.createElement('div'),
        _modal = document.createElement('div'),
        _cb;


    // Various Templates
    var _templates = {};

    _templates.optionsPage = {
        name: 'optionsPage',
        url: _.browser.url('dist/templates/options.html'),
        target: 'body'
    };

    _templates.menuItem = {
        name: 'menuItem',
        url: _.browser.url('dist/templates/options-menu.html'),
        target: '#nav .nav-section:last-child',
        append: 1,
        events: function(ele) {
            ele.addEventListener('click', function(e) {
                // Prevent Click Bubbling to Document
                if (!_menuOpen) {
                    e.stopPropagation();
                }

                showOptions();
            }, false);
        }
    };

    _templates.fabIcon = {
        name: 'fabIcon',
        url: _.browser.url('dist/templates/options-fab.html'),
        target: 'core-header-panel#content-container',
        enabled: function() {
            var userOptions = PlayMidnight.getUserOptions();
            return userOptions.fab;
        },
        events: function(ele) {
            ele.addEventListener('click', function(e) {
                // Prevent Click Bubbling to Document
                if (!_menuOpen) {
                    e.stopPropagation();
                }

                showOptions();
            }, false);
        }
    };


    // Load Options Templates and Inject
    function createOptions() {
        _.inject(_templates, function() {
            var userOptions = PlayMidnight.getUserOptions(),
                optionsGraph = PlayMidnight.getOptionsGraph(),
                optionsPage = _templates.optionsPage.element,
                optionsContainer = _templates.optionsPage.element.querySelector('section.options .options-container'),
                frag = buildOptions(optionsGraph, userOptions),
                items;

            optionsContainer.appendChild(frag);
            optionsPage.querySelector('#pm-save-options').addEventListener('click', function() {
                saveOptions(userOptions);
            });

            document.body.classList.add('play-midnight-active');
        });
    }


    // Save Options
    function saveOptions(userOptions) {
        var optionsPage = _templates.optionsPage.element;
        var toSave = optionsPage.querySelectorAll('.play-midnight-option, .play-midnight-collection');
        var saveDialog = optionsPage.querySelector('.save-dialog');
        var options = {};

        for (var i = 0; i < toSave.length; i++) {
            var ele = toSave[i];
            var type = ele.type;
            var key = ele.key;

            if (type === 'boolean') {
                var checked = ele.querySelector('paper-toggle-button::shadow #toggleContainer').hasAttribute('checked');
                options[key] = checked;
            }

            if (type === 'array') {
                var radio = ele.querySelector('.collection input:checked');
                var selected = ele.querySelector('.collection-item.selected');
                var singleKey = ele.single;

                delete selected.item.selected;

                options[key] = ele.collection;
                options[singleKey] = JSON.parse(JSON.stringify(selected.item));
            }
        }

        _.browser.save(options, function(options) {
            _.log('Options Saved Successfully!');

            saveDialog.classList.add('visible');
            setTimeout(function() {
                saveDialog.classList.remove('visible');

                setTimeout(function() {
                    location.reload();
                }, 1000);
            }, 2000);
        });
    }


    // Build Options
    function buildOptions(options, values) {
        var fragment, option, ele;

        fragment = document.createDocumentFragment();

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                option = options[key];

                if (option.type === 'section') {
                    ele = buildSection(key, option, values);
                    fragment.appendChild(ele);
                }

                if (option.type === 'array') {
                    ele = buildArray(key, option, values);
                    fragment.appendChild(ele);
                }

                if (option.type === 'boolean') {
                    ele = buildBoolean(key, option, values);
                    fragment.appendChild(ele);
                }

                if (option.type === 'string') {
                    if (option.visible !== true) {
                        continue;
                    }

                    ele = buildString(option);
                    fragment.appendChild(ele);
                }
            }
        }

        return fragment;
    }


    // Build Section
    function buildSection(key, option, values) {
        var fragment = document.createDocumentFragment();

        var title = _.createElement('<h3 class="play-midnight-section-title"></h3>');
        title.innerText = option.title;

        var content = buildOptions(option.options, values);

        fragment.appendChild(title);
        fragment.appendChild(content);

        return fragment;
    }


    // Build string
    function buildString(option) {
        var text = _.createElement('<div class="play-midnight-text-area"></div>');
        text.innerHTML = option.description;

        return text;
    }


    // Build Array
    function buildArray(key, option, values) {
        var fragment = document.createDocumentFragment();

        var singleKey = option.single;
        var collection = [];
        var collectionEle = _.createElement('<div class="collection"></div>');

        // Full Container
        var container = _.createElement('<div class="play-midnight-collection"></div>');
        container.type = option.type;
        container.key = key;
        container.single = singleKey;
        container.default = option.default;
        container.collection = collection;
        container.collectionEle = collectionEle;

        // Build Header
        var details = _.createElement('<div class="details"><div class="option-info"><div class="option-name"></div><div class="option-description"></div></div></div>');
        var title = document.createTextNode(option.title);
        var description = document.createTextNode(option.description);
        details.querySelector('.option-name').appendChild(title);
        details.querySelector('.option-description').appendChild(description);

        if (option.createable === true) {
            var button = _.createElement('<sj-paper-button class="material-primary" role="button"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="pointer-events: none; display: block;"><g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g></svg></sj-paper-button>');
            var form = buildForm(singleKey, option);

            button.addEventListener('click', function() {
                form.classList.toggle('visible');
            });

            details.appendChild(button);

            container.appendChild(details);
            container.appendChild(form);
        } else {
            container.appendChild(details);
        }

        // Build Collection
        var initialCollection = values[key];
        for (var i = 0, len = initialCollection.length; i < len; i++) {
            var item = initialCollection[i];
            item.selected = _.equalObjects(item, values[singleKey]);

            createCollectionItem(item, collection, collectionEle, singleKey);
        }

        container.appendChild(collectionEle);
        fragment.appendChild(container);

        return fragment;
    }


    function createCollectionItem(item, collection, collectionEle, key) {
        if (collection.indexOf(item) > -1) {
            return;
        }

        var collectionItem = _.createElement('<div class="collection-item"><div class="remove-item"></div><input type="radio" /><div class="fields"></div></div>');
        collectionItem.classList.add(key);
        collectionItem.item = item;

        var radio = collectionItem.querySelector('input');
        radio.name = key;

        if (item.selected === true) {
            collectionItem.classList.add('selected');
            radio.checked = true;
        }

        // Build Up Keys
        for (var metaKey in item) {
            if (item.hasOwnProperty(metaKey)) {
                var meta = item[metaKey];

                if (metaKey === 'selected') {
                    continue;
                }

                if (metaKey === 'color') {
                    collectionItem.style.background = meta;
                }

                var itemField = _.createElement('<div class="field"></div>');
                itemField.classList.add('field-' + metaKey);
                itemField.innerText = meta;

                collectionItem.querySelector('.fields').appendChild(itemField);
            }
        }

        collection.push(item);
        collectionEle.appendChild(collectionItem);

        _.log('New Accent: %s', JSON.stringify(item));
        _.log('Collection: %s', JSON.stringify(collection));

        var deleteBtn = collectionItem.querySelector('.remove-item');
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();

            var item = this.parentNode;
            removeFromCollection(item);
        });

        collectionItem.addEventListener('click', function(e) {
            var selected = this.parentNode.querySelector('.selected');

            if (selected) {
                selected.classList.remove('selected');
            }

            this.classList.add('selected');
            this.querySelector('input').checked = true;
        });
    }


    // Build Form
    function buildForm(key, option) {
        var form = _.createElement('<form class="add-new" action="javascript:;"></form>');
        form.key = key;

        var title = _.createElement('<h4 class="subtitle">Add New ' + _.toTitleCase(option.single) + '</h4>');
        form.appendChild(title);

        var singleOption = option.default;

        for (var meta in singleOption) {
            if (singleOption.hasOwnProperty(meta)) {
                var field = _.createElement('<div class="play-midnight-input"><paper-input-decorator label="" floatinglabel><input type="text" is="core-input" autofocus="" placeholder="" aria-label="" no-focus=""></paper-input-decorator></div>');
                var input = field.querySelector('paper-input-decorator');
                input.setAttribute('label', _.toTitleCase(meta));
                input.setAttribute('aria-label', _.toTitleCase(meta));
                input.querySelector('input').id = meta;

                if (meta === 'color') {
                    input.setAttribute('label', 'Color - #xxx, #xxxxxx, rgb(x,x,x)');
                    input.setAttribute('aria-label', 'Color - #xxx, #xxxxxx, rgb(x,x,x)');
                }

                form.appendChild(field);
            }
        }

        var button = _.createElement('<div class="form-action"><sj-paper-button class="material-primary" role="button" tabindex="0" no-focus=""></sj-paper-button></div>');
        button.querySelector('sj-paper-button').innerText = 'Create ' + _.toTitleCase(option.single);

        button.addEventListener('click', function() {
            var fields = form.querySelectorAll('input');

            if (addToCollection(form)) {
                for (var i = 0; i < fields.length; i++) {
                    var input = fields[i];

                    input.value = '';
                    input.setAttribute('no-focus', '');
                }

                form.classList.remove('visible');
            }
        });

        form.appendChild(button);

        return form;
    }


    // Add To Collection
    function addToCollection(form) {
        var collectionDiv = _.getParentElement(form, 'play-midnight-collection');
        var inputs = form.querySelectorAll('input');
        var collection = collectionDiv.collection;
        var collectionEle = collectionDiv.collectionEle;
        var key = form.key;
        var item = {};

        for (var i = 0; i < inputs.length; i++) {
            var ele = inputs[i];
            var meta = ele.id;
            var val = ele.value;

            item[meta] = val;

            if (val.length < 1) {
                return false;
            }

            if (meta === 'color') {
                if (!/(?:^#[a-fA-F\d]{6}$)|(?:^#[a-fA-F\d]{3}$)|(?:^rgb\([ ]*?([\d]{1,3})[ ]*?,[ ]*?([\d]{1,3})[ ]*?,[ ]*?([\d]{1,3})[ ]*?\)$)/.test(val)) {
                    return false;
                }
            }
        }

        createCollectionItem(item, collection, collectionEle, key);
        return true;
    }


    // Remove From Collection
    function removeFromCollection(single) {
        var collectionDiv = _.getParentElement(single, 'play-midnight-collection');
        var key = collectionDiv.single;
        var collection = collectionDiv.collection;
        var collectionEle = collectionDiv.collectionEle;
        var collectionDefault = collectionDiv.default;
        var selected = single.classList.contains('selected');

        _.log('Removed Accent: %s', JSON.stringify(single.item));

        _.remove(single);
        collection.splice(collection.indexOf(single.item), 1);

        if (collectionEle.children.length < 1) {
            createCollectionItem(collectionDefault, collection, collectionEle, key);
        }

        if (selected) {
            collectionEle.children[0].click();
        }

        _.log('Collection: %s', JSON.stringify(collection));
    }



    // Build Boolean
    function buildBoolean(key, option, values) {
        var fragment = document.createDocumentFragment();

        var details = _.createElement('<div class="play-midnight-option"><div class="option-info"><div class="option-name"></div><div class="option-description"></div></div><paper-toggle-button data-id="" checked="" data-original-value="" role="button" aria-pressed="" tabindex="0" touch-action="pan-y" no-focus=""></paper-toggle-button></div>');
        var title = document.createTextNode(option.title);
        var description = document.createTextNode(option.description);
        details.querySelector('.option-name').appendChild(title);
        details.querySelector('.option-description').appendChild(description);
        details.key = key;
        details.type = option.type;

        var checkbox = details.querySelector('paper-toggle-button');
        checkbox.setAttribute('data-id', key);
        checkbox.setAttribute('data-original-value', values[key] || false);
        checkbox.setAttribute('checked', values[key] || false);

        fragment.appendChild(details);

        return fragment;
    }


    // Listener for Document.click when Menu is open
    function handleClick(e) {
        if (_menuOpen && !_.isClicked(e.target, _templates.optionsPage.element)) {
            hideOptions();
        }
    }


    // Show Options Page
    function showOptions() {
        document.addEventListener('click', handleClick, false);
        document.body.classList.add('is-pm-options');
        _menuOpen = true;
    }


    // Hide Options Page
    function hideOptions() {
        document.removeEventListener('click', handleClick);
        document.body.classList.remove('is-pm-options');
        _menuOpen = false;
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/g, _.browser.url('/dist'));
        template = template.replace(/\{VERSION_NUMBER\}/g, _.browser.url('/dist'));

        return _.createElement(template);
    }


    // Add Options to Object
    PMOptions.create = createOptions;
    PMOptions.show = showOptions;
    PMOptions.hide = hideOptions;


    // Add To Core
    PlayMidnight.Options = PMOptions;


    // Return Object for Modularity
    return PMOptions;
})(PlayMidnightUtilities, PlayMidnight);

/*global PlayMidnight, chrome */
(function(PlayMidnight){
	'use strict';

	PlayMidnight.init();
})(PlayMidnight);
