jQuery(function($){


var PlayMidnightOptions = {
	defaults: {
		favicon: true
	},

	elems: {
		save_button: $('#save'),
		status: $('#status'),
	},

	init: function() {
		var pmo = this;
		this.loadOptions();
		this.elems.save_button.on('click', function(e) {
			e.preventDefault();

			pmo.saveOptions();
		});
	},

	loadOptions: function() {
		var pmo = this;
		chrome.storage.sync.get( pmo.defaults, function( options ) {
			$('#favicon')[0].checked = options.favicon;
		});
	},

	saveOptions: function() {
		var pmo = this;

		var favicon = $('#favicon')[0].checked;
		chrome.storage.sync.set( {
			favicon: favicon
		}, function( ) {
			pmo.elems.status.fadeIn(500, function() {
				setTimeout(function() {
					pmo.elems.status.fadeOut(500);
				}, 1500);
			});
		});
	}
};

PlayMidnightOptions.init();


});