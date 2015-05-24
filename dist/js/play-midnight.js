/* global Promise */
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
})();

/*global Promise, chrome, PlayMidnightUtilities */
// _ references Utilities
var PlayMidnight = (function(_){
	'use strict';

	// Our Friend
	var PM = {};

	// Dev Mode: Use CSS File rather than inline <style> (inline allows dynamic accent colors)
	var _dev = false;

	var VERSION_NUMBER = '2.0.3';

	// Reset Options when version less than
	var _resetOptions = '2.0.3';

	// Nuke All Options
	var _nukeOptions = '2.0.3';

	// All Options Defined
	var _optionsGraph = {}; // Full Options Tree (options.json)
	var _defaultOptions = {}; // Default Options
	var _userOptions = {}; // User Loaded Options


	// Favicon Attributes
	var _favicon = {
		// Load Newest Icon with Timestamp to prevent Caching
		url: chrome.extension.getURL('dist/images/favicon.ico') + '?v=' + Date.now()
	};


	// Stylesheets
	var _stylesheets = {
		main: {
			id: 'play-midnight-stylesheet',
			url: chrome.extension.getURL('dist/css/play-midnight.css'),
			html: '',
			enabled: function() {
				return _userOptions.enabled;
			}
		},

		options: {
			id: 'play-midnight-options',
			url: chrome.extension.getURL('dist/css/play-midnight-options.css'),
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
		_.$http.get(chrome.extension.getURL('dist/options.json'))
			.then(function(options) {
				_optionsGraph = JSON.parse(options);
				_defaultOptions = parseOptions(_optionsGraph);

				_.log('Default Options Loaded');
				for (var key in _defaultOptions) {
					if (_defaultOptions.hasOwnProperty(key)) {
						_.log('%s: %s', key.toString().toUpperCase(), JSON.stringify(_defaultOptions[key]));
					}
				}

				chrome.storage.sync.get(_defaultOptions, function(options) {
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

			chrome.storage.sync.set(_defaultOptions, function() {
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

			chrome.storage.sync.set(options, function() {
				_userOptions = options;
				if (cb && typeof cb === 'function') {
					cb();
				}
				return;
			});

		// Update Version Number
		} else if (_.versionCompare(options.version, VERSION_NUMBER) === -1) {
			_.log('PLAY MIDNIGHT: Updated to version %s', VERSION_NUMBER);

			chrome.storage.sync.set({ version: VERSION_NUMBER }, function() {
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

					if (_userOptions.enabled) {
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
		var notificationUrl;

		// First Run
		if (_userOptions.lastRun === undefined || _userOptions.lastRun === null) {
			notificationUrl = chrome.extension.getURL('dist/templates/notifications/default.html');

        // New Version
		} else if (_.versionCompare(_userOptions.lastRun, VERSION_NUMBER) < 0) {
			notificationUrl = chrome.extension.getURL('dist/templates/notifications/' + VERSION_NUMBER + '.html');

        // Current Version
		} else {
			_.log('Already on Current Version (v%s), Skipping Modal', _userOptions.lastRun);
			return;
		}

		_.$http.get(notificationUrl).then(function(template) {
			_.log('Show notification for version: %s', VERSION_NUMBER);
			PM.Modal.show(template, function() {
				chrome.storage.sync.set({ lastRun: VERSION_NUMBER }, function() {
					_userOptions.lastRun = VERSION_NUMBER;
				});
			});
		}).catch(function() {
			_.log('No notification template exists for version: %s', VERSION_NUMBER);
			chrome.storage.sync.set({ lastRun: VERSION_NUMBER }, function() {
				_userOptions.lastRun = VERSION_NUMBER;
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

/*global Promise, PlayMidnightUtilities, chrome */
var PlayMidnightInjector = (function(_){
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
                    _.log(_temps);
                    cb(_temps);
                }
            });
    }


    // Load Options Templates and Inject
    function injectTemplates(_temps, cb) {
        var target;

        _.log('Starting Load Templates: %s', JSON.stringify(_temps));
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
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

        return template;
    }


    // Add to utils
    _.inject = injectTemplates;


    // Return Object for Modularity
    return PMInjector;
})(PlayMidnightUtilities);

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
		template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));
		//template = template.replace(/\{VERSION_NUMBER\}/, VERSION_NUMBER);

		return _.createElement(template);
	}


	// Add To Core
	PlayMidnight.Modal = PMModal;


	// Return Object for Modularity
	return PMModal;
})(PlayMidnightUtilities, PlayMidnight);

/*global PlayMidnightUtilities, PlayMidnight, chrome */
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
        url: chrome.extension.getURL('dist/templates/options.html'),
        target: 'body'
    };

    _templates.menuItem = {
        name: 'menuItem',
        url: chrome.extension.getURL('dist/templates/options-menu.html'),
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
        url: chrome.extension.getURL('dist/templates/options-fab.html'),
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
                options = PlayMidnight.getOptionsGraph(),
                optionsPage = _templates.optionsPage.element,
                optionsContainer = _templates.optionsPage.element.querySelector('section.options .options-container'),
                frag = buildOptions(options, userOptions),
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
            var type = ele.dataset.type;
            var key = ele.dataset.key;

            if (type === 'boolean') {
                var checked = ele.querySelector('paper-toggle-button::shadow #toggleContainer').hasAttribute('checked');
                options[key] = checked;
            }

            if (type === 'array') {
                console.log(ele);
                var radio = ele.querySelector('input:checked');
                console.log(radio);
                var selected = _.getParentElement(radio, 'collection-item');
                var index = selected.dataset.index;
                var singleKey = selected.dataset.key;

                options[key] = userOptions[key];
                options[singleKey] = JSON.parse(JSON.stringify(userOptions[key][index]));
            }
        }

        chrome.storage.sync.set(options, function(options) {
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
            }
        }

        return fragment;
    }


    // Build Section
    function buildSection(key, option, values) {
        var fragment = document.createDocumentFragment();

        var title = _.createElement('<h3 class="play-midnight-section-title"></h3>');
        title.classList.add('play-midnight-section-title');
        title.innerText = option.title;

        var content = buildOptions(option.options, values);

        fragment.appendChild(title);
        fragment.appendChild(content);

        return fragment;
    }


    // Build Array
    function buildArray(key, option, values) {
        var fragment = document.createDocumentFragment();

        // Build Header
        var details = _.createElement('<div class="play-midnight-option full"><div class="option-info"><div class="option-name"></div><div class="option-description"></div></div></div>');
        var title = document.createTextNode(option.title);
        var description = document.createTextNode(option.description);
        details.querySelector('.option-name').appendChild(title);
        details.querySelector('.option-description').appendChild(description);

        fragment.appendChild(details);

        // Build Collection
        var collectionEle = _.createElement('<div class="play-midnight-collection"></div>');
        collectionEle.dataset.type = option.type;
        collectionEle.dataset.key = key;

        var singleKey = option.single;
        var collection = values[key];
        for (var i = 0, len = collection.length; i < len; i++) {
            var singleItem = collection[i];

            var collectionItem = _.createElement('<div class="collection-item"><label><input type="radio" /><div class="fields"></div></label></div>');
            collectionItem.classList.add(singleKey);
            collectionItem.dataset.index = i;
            collectionItem.dataset.key = singleKey;
            collectionItem.dataset.collection = key;

            var radio = collectionItem.querySelector('input');
            radio.name = singleKey;

            if (_.equalObjects(singleItem, values[singleKey])) {
                collectionItem.classList.add('selected');
                radio.checked = true;
            }

            // Build Up Keys
            for (var metaKey in singleItem) {
                if (singleItem.hasOwnProperty(metaKey)) {
                    var meta = singleItem[metaKey];

                    if (metaKey === 'color') {
                        collectionItem.style.background = meta;
                    }

                    var itemField = _.createElement('<div class="field"></div>');
                    itemField.classList.add('field-' + metaKey);
                    itemField.innerText = meta;

                    collectionItem.querySelector('.fields').appendChild(itemField);
                }
            }

            collectionItem.addEventListener('click', function(e) {
                this.parentNode.querySelector('.selected').classList.remove('selected');
                this.classList.add('selected');
                this.querySelector('input').checked = true;
            });

            collectionEle.appendChild(collectionItem);
        }

        fragment.appendChild(collectionEle);

        return fragment;

        // Create Field
        // <div class="create"></div>
        // if (option.createable === true) {
        //     baby = option.collection[0].data;
        //     field = _.createElement('<h4 class="subtitle">Add New ' + _.toTitleCase(option.single) + '</h4>');
        //
        //     form = temp.querySelector('.create');
        //     form.id = 'pm-option-' + key;
        //
        //     form.appendChild(field);
        //
        //     for (var iKey in baby) {
        //         if (baby.hasOwnProperty(iKey)) {
        //             field = _.createElement('<paper-input-decorator label=""><input type="text" is="core-input" autofocus="" placeholder="" aria-label="Name" no-focus=""></paper-input-decorator>');
        //
        //             field.setAttribute('label', _.toTitleCase(iKey));
        //             field.querySelector('input').id = iKey;
        //
        //             form.appendChild(field);
        //         }
        //     }
        //
        //     form.appendChild(_.createElement('<div class="form-action"><sj-paper-button class="material-primary" role="button" tabindex="0" no-focus="">Create</sj-paper-button></div>'));
        // }


    }


    // Build Boolean
    function buildBoolean(key, option, values) {
        var fragment = document.createDocumentFragment();

        var details = _.createElement('<div class="play-midnight-option"><div class="option-info"><div class="option-name"></div><div class="option-description"></div></div><paper-toggle-button data-id="" checked="" data-original-value="" role="button" aria-pressed="" tabindex="0" touch-action="pan-y" no-focus=""></paper-toggle-button></div>');
        var title = document.createTextNode(option.title);
        var description = document.createTextNode(option.description);
        details.querySelector('.option-name').appendChild(title);
        details.querySelector('.option-description').appendChild(description);
        details.dataset.type = option.type;
        details.dataset.key = key;

        var checkbox = details.querySelector('paper-toggle-button');
        checkbox.setAttribute('data-id', key);
        checkbox.setAttribute('data-original-value', values[key] || false);
        checkbox.setAttribute('checked', values[key] || false);

        fragment.appendChild(details);

        return fragment;
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
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

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
