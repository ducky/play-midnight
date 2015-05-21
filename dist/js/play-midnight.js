var PlayMidnightUtilities = (function(){
	'use strict';

	// Our Friend
	var PMUtils = {};

	var _verbose = false;

	PMUtils.verbose = function() {
		return _verbose;
	};

	PMUtils.setVerbose = function(verbose) {
		_verbose = verbose;
	};

	PMUtils.log = function() {
		if (_verbose) {
			console.log.apply(console, arguments);
		}
	};

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

	PMUtils.empty = function(element) {
		while (element.lastChild) {
		    elmenet.removeChild(elmenet.lastChild);
		}
	};

	PMUtils.transitionEnd = function() {
		var i,
				el = document.createElement('div'),
				transitions = {
					'transition':'transitionend',
					'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
					'MozTransition':'transitionend',
					'WebkitTransition':'webkitTransitionEnd'
				};

		for (i in transitions) {
			if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
				return transitions[i];
			}
		}
	}();

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

	PMUtils.insertAfter = function(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	};

	PMUtils.createElement = function(html) {
		var temp = document.createElement('div');

		temp.innerHTML = html;
		return temp.childNodes[0];
	};

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

var PlayMidnightNotify = (function(_){
	'use strict';

	// Our Friend
	var PMNotify = {};

	var _backdrop = document.createElement('div'),
			_modal = document.createElement('div');

  PMNotify.show = function(templateHtml, cb) {
		var template = parseTemplate(templateHtml);

		injectModal(function() {
			_.empty(_modal);
			_modal.appendChild(template);

			setTimeout(function() {
				_backdrop.classList.add('modal-show');
			}, 50);
	    _modal.querySelector('#play-midnight-modal .confirm-btn').addEventListener('click', function(e) {
	      e.preventDefault();

				_backdrop.classList.remove('modal-show');

				if (typeof cb === 'function' && cb) {
	        cb();
	      }
	    });
		});
  };

	function injectModal(cb) {
		if (!document.body.contains(_backdrop)) {
			_backdrop.id = 'play-midnight-modal-backdrop';
			_modal.id = 'play-midnight-modal';

			_backdrop.appendChild(_modal);
			document.body.appendChild(_backdrop);
		}

		if (typeof cb === 'function' && cb) {
			cb();
		}
	}

  function parseTemplate(template) {
    template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

    // TODO
    return _.createElement(template);
  }

	// Return Object for Modularity
	return PMNotify;
})(PlayMidnightUtilities);

// _ references Utilities
var PlayMidnight = (function(_, Notify){
	'use strict';

	// Our Friend
	var PM = {};

	// Dev Mode: Use CSS File rather than inline <style> (inline allows dynamic accent colors)
	var _dev = false;

	var VERSION_NUMBER = '2.0.0';

	// Reset Options when version less than
	var _resetOptions = '2.0.0';

	// Default Options
	var _options = {
		version: VERSION_NUMBER,
		enabled: true,
		lastRun: null,
		favicon: true,
		verbose: true,
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

	// Set Color Temporarily
	// chrome.storage.sync.set({ accent: {
	// 	'name': 'Blue Abyss',
	// 	'color': '#3179a1'
	// }});

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

	// Various Templates
	var _templates = {
		menuItem: {
			url: chrome.extension.getURL('dist/templates/options-menu.html'),
			html: ''
		},

		optionsPage: {
			url: chrome.extension.getURL('dist/templates/options.html'),
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


	// Expose to Outside World
	PM.version = VERSION_NUMBER;
	PM.options = _options;
	PM.optionsShown = false;


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

			var skip = ['accents', 'verbose'];
			for (var key in _options) {
				if (options[key] === undefined || skip.indexOf(key) === -1) {
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


	// Inject options page and menu item
	function injectOptions() {
		var menuList = document.querySelector('#nav_collections'),
				menuItem;

		function doInject() {
			_.$http.get(_templates.menuItem.url).then(function(html) {
				_templates.menuItem.html = html;
				_templates.menuItem.element = _.createElement(html);

				menuItem = _templates.menuItem.element;
				menuList.appendChild(menuItem);
				menuItem.addEventListener('click', function() {
					showOptions();
				}, true);
			});
		}

		_.$http.get(_templates.optionsPage.url).then(function(html) {
			_templates.optionsPage.html = html;
			_templates.optionsPage.element = _.createElement(html);

			doInject();
		});
	}


	// Show Options Page
	function showOptions() {
		if (PM.optionsShown) {
			return;
		}

		var coreToolbar = document.querySelector('core-toolbar#material-app-bar'),
				currentTitle = document.querySelector('#material-breadcrumbs .tab-text'),
				headerBar = document.querySelector('.material-header-bar.bottom'),
				mainContent = document.querySelector('#music-content'),
				currentPage = document.querySelector('#music-content > .g-content'),
				pageItem;

		currentPage.style.opacity = 0;
		currentTitle.textContent = 'Play Midnight';
		coreToolbar.className = '';
		headerBar.classList.remove('visible');
		pageItem = _templates.optionsPage.element.innerHTML;
		currentPage.innerHTML = pageItem;
		currentPage.style.opacity = 1;
		PM.optionsShown = true;
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
		if (_options.lastRun === undefined || _options.lastRun === null || _.versionCompare(_options.lastRun, VERSION_NUMBER) === -1) {
			var notificationUrl = chrome.extension.getURL('dist/templates/notifications/' + VERSION_NUMBER + '.html');

			_.$http.get(notificationUrl).then(function(template) {
				Notify.show(template, function() {
					chrome.storage.sync.set({ lastRun: VERSION_NUMBER }, function() {
						_options.lastRun = VERSION_NUMBER;
					});
				});
			}).catch(function() {
				_.log('No notification template exists for version: %s', VERSION_NUMBER);
			});
		}
	}


	// Yay Initialize!
	function init() {
		loadOptions(function() {
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

			injectStyle();

			window.addEventListener('load', function() {
				//injectOptions();
				updateFavicon();
				checkNotification();
			});
		});
	}

	// Load Play Midnight
	init();

	// Return Object for Modularity
	return PM;
})(PlayMidnightUtilities, PlayMidnightNotify);

	// // Load Options from Chrome Storage
	// // Proceed with Callback Function
	// PM.loadOptions: function( callback ) {
	// 	var self = this;

	// 	// Sync options from storage, use defaults as Initial Values
	// 	chrome.storage.sync.get( self.defaults, function( options ) {
	// 		if (callback && typeof callback === 'function') {
	// 			callback( options );
	// 		}
	// 	});
	// },

	// 	// Populate Options Page (Checkboxes)
	// 	populate: function( options ) {
	// 		var self = this;

	// 		var favIcon = $('#play-midnight-options #favicon');
	// 		var styled = $('#play-midnight-options #styled');
	// 		var recentActivity = $('#play-midnight-options #recentActivity');
	// 		var themeColor = $('#play-midnight-options #' + options.theme + '.theme-color');

	// 		if ( options.favicon ) {
	// 			favIcon.prop( 'checked', true ).closest('.option').addClass('selected');
	// 		}

	// 		if ( options.styled ) {
	// 			styled.prop( 'checked', true ).closest('.option').addClass('selected');
	// 		}

	// 		if ( options.recentActivity ) {
	// 			recentActivity.prop( 'checked', true ).closest('.option').addClass('selected');
	// 		}

	// 		themeColor.prop( 'checked', true ).closest('.option').addClass('selected');

	// 		$('#play-midnight-options #save').addClass( options.theme );
	// 		$('#play-midnight-options .option').on('click', function() {
	// 			self.doSelect(this);
	// 		});
	// 	},

	// 	// Update Classes on Checkbox Select
	// 	doSelect: function( ele ) {
	// 		var option = $(ele);
	// 		var group = option.closest('.options-group');

	// 		group.find('.selected').removeClass('selected');
	// 		option.addClass('selected');
	// 	},

	// 	// Save Settings to Chrome Storage
	// 	save: function( callback ) {
	// 		// Get All Settings Values
	// 		var favicon = $('#play-midnight-options #favicon').is(':checked');
	// 		var styled = $('#play-midnight-options #styled').is(':checked');
	// 		var recentActivity = $('#play-midnight-options #recentActivity').is(':checked');
	// 		var theme = $('#play-midnight-options .theme-color:checked').attr('id');
	// 		var status = $('#play-midnight-options #status');

	// 		// Saving to Chrome Storage
	// 		chrome.storage.sync.set( {
	// 			favicon: favicon,
	// 			styled: styled,
	// 			recentActivity: recentActivity,
	// 			theme: theme
	// 		}, function( ) {
	// 			// Show Status, then call Callback function
	// 			status.fadeIn(500, function() {
	// 				setTimeout(function() {
	// 					status.fadeOut(500, function() {
	// 						if (callback && typeof callback === 'function') {
	// 							callback();
	// 						}
	// 					});
	// 				}, 800);
	// 			});
	// 		});
	// 	}
	// };

	// 	// Load Play Midnight Options
	// 	PlayMidnightOptions.load(function( options ) {
	// 		self.options = options;

	// 		// Inject Stylesheet
	// 		self.injectStyle();

	// 		// Wait for DOM Before Appending/Updating
	// 		$(window).load(function() {
	// 			// Apply New Favicon
	// 			self.updateFavicon();

	// 			// Inject Options Template
	// 			self.injectOptions(function() {
	// 				// Populate Options Template Values
	// 				PlayMidnightOptions.populate( self.options );

	// 				// Save Options, Refresh Page
	// 				$('#play-midnight-options #save').on( 'click', function(e) {
	// 					e.preventDefault();

	// 					PlayMidnightOptions.save( function() {
	// 						location.reload(true);
	// 					} );
	// 				});

	// 				// Hide Options
	// 				$('#play-midnight-options #cancel').on( 'click', function(e) {
	// 					e.preventDefault();

	// 					$('#play-midnight-options').removeClass('show');
	// 				});
	// 			});

	// 			// Add Recent Activity/Sorting
	// 			self.addSortOptions();

	// 			// Add Personal Credits
	// 			self.addCredits();
	// 		});
	// 	});
	// },


		// style = $('<link>', {
		// 	rel: 'stylesheet',
		// 	type: 'text/css',
		// 	href: chrome.extension.getURL( 'css/play-midnight.css')
		// });
		// $('head').append(style);

		// // Load Themed Stylesheet
		// if ( _options.styled ) {
		// 	var theme = _options.theme;
		// 	style = $('<link>', {
		// 		rel: 'stylesheet',
		// 		type: 'text/css',
		// 		href: chrome.extension.getURL( 'css/play-midnight-' + theme + '.css')
		// 	});
		// 	$('head').append(style);

		// // Load Minimal Stylesheet for Options Page and Play Midnight Button
		// } else {
		// 	style = $('<link>', {
		// 		rel: 'stylesheet',
		// 		type: 'text/css',
		// 		href: chrome.extension.getURL( 'css/play-midnight-options.css')
		// 	});
		// 	$('head').append(style);
		// }
	// }

	// // Inject Options Template
	// injectOptions: function( callback ) {
	// 	// Create Options Div
	// 	var options = $('<div />', {
	// 		id: 'play-midnight-options',
	// 	});

	// 	// Load Options Template from Extension
	// 	$.get(chrome.extension.getURL( 'assets/options.html'), function(htmls) {
	// 		// Set Options Div HTML
	// 		options.html( htmls );

	// 		// Append to Body
	// 		$('body').append( options );

	// 		// Create Play Midnight Button w/ Logo
	// 		var button = $('<button />', { id: 'btn-pm-options', class: 'button small vertical-align' })
	// 			.append( $('<img />', { src: chrome.extension.getURL('icon48.png') }))
	// 			.append( '<span>Play Midnight Options</span>' );

	// 		// Show Options on Click
	// 		button.on( 'click', function() {
	// 			$('#play-midnight-options').addClass('show');
	// 		});

	// 		// Append Button to Navbar
	// 		$('#headerBar .nav-bar').prepend( button );

	// 		// Callback Function
	// 		if (callback && typeof callback === 'function') {
	// 			callback();
	// 		}
	// 	});
	// }

	// // Update Favicon to Play Midnight version
	// function updateFavicon() {
	// 	if ( !_options.favicon ) {
	// 		return;
	// 	}

	// 	// Load Newest Icon with Timestamp to prevent Caching
	// 	var iconUrl = chrome.extension.getURL('images/favicon.ico') + '?v=' + Date.now();

	// 	// Remove Old Favicon
	// 	$('link[rel="SHORTCUT ICON"], link[href="favicon.ico"]').remove();

	// 	// Add New Favicon
	// 	$('head').append( $('<link>', {
	// 		rel: 'shortcut icon',
	// 		href: iconUrl
	// 	}) );
	// }

	// // Add Personal Credits
	// function addCredits() {
	// 	var donateUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KHH9ZJH42FF4J';
	// 	var personalUrl = 'http://christieman.com/';

	// 	var divider = $('<div', {
	// 		class: 'nav-section-divider'
	// 	});

	// 	var header = $('<div>', {
	// 		class: 'nav-section-header',
	// 		text: 'PLAY MIDNIGHT - '
	// 	}).append( $('<a>', { href: donateUrl, text: 'DONATE' }) );

	// 	var credits = $('<ul>', { id: 'play-midnight' })
	// 		.append( $('<li>', { class: 'nav-item-container' })
	// 			.append( $('<a>', {
	// 				href: personalUrl,
	// 				text: 'By Chris Tieman'
	// 			})));

	// 	if ( !$('#playMidnight-credits').length ) {
	// 		$('#nav').append(
	// 			$('<div>', { id: 'playMidnight-credits', })
	// 				.append(divider)
	// 				.append(header)
	// 				.append(credits));
	// 	}
	// }
