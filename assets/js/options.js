jQuery(function($){

var PlayMidnightOptions = {
	defaults: {
		favicon: true,
		theme: 'default'
	},

	elems: {
		save_button: $('#save'),
		status: $('#status'),
	},

	init: function() {
		var pmo = this;
		this.loadOptions();
		$('.option').on('click', function() {
			pmo.doSelect(this);
		});
		this.elems.save_button.on('click', function(e) {
			e.preventDefault();

			pmo.saveOptions();
		});
	},

	doSelect: function(ele) {
		var option = $(ele);
		var group = option.closest('.options-group');

		group.find('.selected').removeClass('selected');
		option.addClass('selected');
	},

	loadOptions: function() {
		var pmo = this;
		chrome.storage.sync.get( pmo.defaults, function( options ) {
			$('#favicon').closest('.option').addClass('selected');
			$('#favicon')[0].checked = options.favicon;

			$('#' + options.theme + '.theme-color').closest('.option').addClass('selected');
			$('#' + options.theme + '.theme-color')[0].checked = true;

			$('#save').addClass( options.theme );
		});
	},

	saveOptions: function() {
		var pmo = this;

		var favicon = $('#favicon')[0].checked;
		var theme = $('.theme-color:checked')[0].id;
		chrome.storage.sync.set( {
			favicon: favicon,
			theme: theme
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