jQuery(function($){


var PlayMidnight = {
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
		var iconUrl = chrome.extension.getURL('images/favicon.ico') + '?v=' + Date.now();

		$('link[rel="SHORTCUT ICON"]').remove();
		$('head').append( $('<link>', {
			rel: 'shortcut icon',
			href: iconUrl
		}) );
	},

	addCredits: function() {
		var midnightWrapper = $('<div>', {
			id: 'playMidnight-credits',
		});

		var divider = $('<div', {
			class: 'nav-section-divider'
		});
		midnightWrapper.append(divider);

		var creditsHead = $('<div>', {
			class: 'nav-section-header',
			html: 'PLAY MIDNIGHT - <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KHH9ZJH42FF4J">DONATE</a>'
		});
		midnightWrapper.append(creditsHead);

		var credits = $('<ul>', {
			id: 'play-midnight'
		});

		var creditsMe = $('<li>', {
			class: 'nav-item-container',
			html: '<a href="http://christieman.com/">By Chris Tieman</a>'
		});
		credits.append(creditsMe);

		midnightWrapper.append(credits);

		if ( !$('#playMidnight-credits').length )
			$('#nav').append(midnightWrapper)
	}
};

PlayMidnight.init();


});