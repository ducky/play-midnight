jQuery(function($){


var PlayMidnight = {
	defaults: {
		favicon: true
	},

	init: function() {
		this.injectStyle();
		this.updateFavicon();
		this.addCredits();
	},

	injectStyle: function() {
		var style = $('<link>', {
			rel: 'stylesheet',
			type: 'text/css',
			href: chrome.extension.getURL('css/play-midnight.css')
		});
		$('head').append(style);
	},

	updateFavicon: function() {
		var pm = this;
		chrome.storage.sync.get(pm.defaults, function( options ) {
			if ( options.favicon === true ) {
				var iconUrl = chrome.extension.getURL('images/favicon.ico') + '?v=' + Date.now();

				$('link[rel="SHORTCUT ICON"]').remove();
				$('head').append( $('<link>', {
					rel: 'shortcut icon',
					href: iconUrl
				}) );
			}
		});
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

		if ( !$('#playMidnight-credits').length )
			$('#nav').append(
				$('<div>', { id: 'playMidnight-credits', })
					.append(divider)
					.append(header)
					.append(credits));
	}
};

PlayMidnight.init();


});