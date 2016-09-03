/*global PlayMidnightUtilities, PlayMidnight, chrome */
var PlayMidnightModal = (function (_, PlayMidnight) {
  'use strict';

  // Our Friend
  var PMModal = {};

  var _injected = false,
    _backdrop = document.createElement('div'),
    _modal,
    _cb;

  // Setup
  _backdrop.id = 'play-midnight-modal-backdrop';

  // Show Modal
  PMModal.show = function (templateHtml, cb) {
    var template = parseTemplate(templateHtml);

    _cb = cb;

    _modal = template;
    _modal.id = 'play-midnight-modal';

    injectModal();

    document.body.classList.add('modal-show');

    _modal.querySelector('.confirm-btn').addEventListener('click', function (e) {
      e.preventDefault();

      document.body.classList.remove('modal-show');
      if (typeof _cb === 'function' && _cb) {
        _cb();
      }
    });
  };

  // Hide Modal
  PMModal.hide = function () {
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
    template = template.replace(/\{CHROME_DIR\}/g, _.browser.url('/dist'));
    template = template.replace(/\{VERSION_NUMBER\}/g, PlayMidnight.version);

    return _.createElement(template);
  }

  // Add To Core
  PlayMidnight.Modal = PMModal;

  // Return Object for Modularity
  return PMModal;
})(PlayMidnightUtilities, PlayMidnight);
