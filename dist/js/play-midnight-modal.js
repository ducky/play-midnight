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
