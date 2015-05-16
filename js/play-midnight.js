var PlayMidnight = (function(){
	'use strict';

	// Our Friend
	var PM = {};

	// Private Variables
	var _options = {
			favicon: true,
			styled: true,
			theme: 'default'
		};

	PM.options = _options;

	// Inject Stylesheet
	function injectStyle() {
		var style = document.createElement('link');

		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = chrome.extension.getURL( 'css/play-midnight.css');

		document.head.appendChild(style);
	}

	function init() {
		injectStyle();
	}

	// Load Play Midnight
	init();

	// Return Object for Modularity
	return PM;
})();

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