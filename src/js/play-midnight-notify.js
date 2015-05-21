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

    return _.createElement(template);
  }

	// Return Object for Modularity
	return PMNotify;
})(PlayMidnightUtilities);
