jQuery(function($){

var PlayMidnightOptions = {
	defaults: {
		favicon: true,
		theme: 'default'
	},

	load: function( callback ) {
		var self = this;
		chrome.storage.sync.get( self.defaults, function( options ) {
			callback( options );
		});
	},

	populate: function( options ) {
		var self = this;

		var favIcon = $('#play-midnight-options #favicon');
		var themeColor = $('#play-midnight-options #' + options.theme + '.theme-color');

		if ( options.favicon ) {
			favIcon.prop( 'checked', true ).closest('.option').addClass('selected');
		}

		themeColor.attr( 'checked', true ).closest('.option').addClass('selected');

		$('#play-midnight-options #save').addClass( options.theme );
		$('#play-midnight-options .option').on('click', function() {
			self.doSelect(this);
		});
	},

	doSelect: function( ele ) {
		var option = $(ele);
		var group = option.closest('.options-group');

		group.find('.selected').removeClass('selected');
		option.addClass('selected');
	},

	save: function( callback ) {
		var favicon = $('#play-midnight-options #favicon').is(':checked');
		var theme = $('#play-midnight-options .theme-color:checked').attr('id');
		var status = $('#play-midnight-options #status');
		
		chrome.storage.sync.set( {
			favicon: favicon,
			theme: theme
		}, function( ) {
			status.fadeIn(500, function() {
				setTimeout(function() {
					status.fadeOut(500, function() {
						callback();
					});
				}, 800);
			});
		});
	}
};

var PlayMidnight = {

	options: {

	},

	init: function() {
		var self = this;

		PlayMidnightOptions.load(function( options ) {
			self.options = options;
			self.injectStyle();
			self.updateFavicon();
			self.injectOptions( function() {
				PlayMidnightOptions.populate( self.options );
				$('#play-midnight-options #save').on( 'click', function(e) {
					e.preventDefault();

					PlayMidnightOptions.save( function() {
						location.reload(true);
					} );
				});

				$('#play-midnight-options #cancel').on( 'click', function(e) {
					e.preventDefault();

					$('#play-midnight-options').removeClass('show');
				});
			});
		});
		this.addCredits();
	},

	injectStyle: function() {
		var theme = this.options.theme;
		var style = $('<link>', {
			rel: 'stylesheet',
			type: 'text/css',
			href: chrome.extension.getURL( 'css/play-midnight-' + theme + '.css')
		});
		$('head').append(style);
	},

	injectOptions: function( callback ) {
		var options = $('<div />', {
			id: 'play-midnight-options',
		});
		$.get(chrome.extension.getURL( 'assets/options.html'), function( htmls ) {
			options.html( htmls );
			$('body').append( options );

			var button = $('<button />', {
				id: 'btn-pm-options',
				class: 'button small vertical-align'
			}).append( $('<img />', {
				src: chrome.extension.getURL('icon48.png')
			})).append( '<span>Play Midnight Options</span>' );

			button.on( 'click', function() {
				$('#play-midnight-options').addClass('show');
			});

			$('#headerBar .nav-bar').prepend( button );
			
			callback();
		});
	},

	updateFavicon: function() {
		if ( this.options.favicon === true ) {
			var iconUrl = chrome.extension.getURL('images/favicon.ico') + '?v=' + Date.now();

			$('link[rel="SHORTCUT ICON"]').remove();
			$('head').append( $('<link>', {
				rel: 'shortcut icon',
				href: iconUrl
			}) );
		}
	},

	addCredits: function() {
		var donateUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KHH9ZJH42FF4J';
		var personalUrl = 'http://christieman.com/';

		var divider = $('<div', {
			class: 'nav-section-divider'
		});

		var header = $('<div>', {
			class: 'nav-section-header',
			text: 'PLAY MIDNIGHT - '
		}).append( $('<a>', { href: donateUrl, text: 'DONATE' }) );

		var credits = $('<ul>', { id: 'play-midnight' })
			.append( $('<li>', { class: 'nav-item-container' })
				.append( $('<a>', {
					href: personalUrl,
					text: 'By Chris Tieman'
				})));

		if ( !$('#playMidnight-credits').length ) {
			$('#nav').append(
				$('<div>', { id: 'playMidnight-credits', })
					.append(divider)
					.append(header)
					.append(credits));
		}
	}
};

PlayMidnight.init();


});