var PlayMidnightOptions = (function(_){
  'use strict';

  // Our Friend
  var PMOptions = {};

  var _injected = false,
      _backdrop = document.createElement('div'),
      _modal = document.createElement('div'),
      _cb;


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



  PMOptions.create = function() {
    var menuList = document.querySelector('#nav_collections'),
        optionsPage,
        menuItem;

    Promise.all([_.$http.get(_templates.optionsPage.url), _.$http.get(_templates.menuItem.url)])
      .then(function(templates) {
        _templates.optionsPage.html = templates[0];
        _templates.optionsPage.element = _.createElement(_templates.optionsPage.html);
        _templates.menuItem.html = templates[1];
        _templates.menuItem.element = _.createElement(_templates.menuItem.html);
        optionsPage = _templates.optionsPage.element;
        menuItem = _templates.menuItem.element;

        document.body.appendChild(optionsPage);

        menuList.appendChild(menuItem);
        menuItem.addEventListener('click', function() {
          showOptions();
        }, true);
    });
  };




  // Show Options Page
  function showOptions() {
    var optionsPage = _templates.optionsPage.element;

    optionsPage.classList.toggle('visible');
  }

  // Show Options
  PMOptions.show = showOptions;

  // Hide Options
  PMOptions.hide = function() {
    _backdrop.classList.remove('modal-show');
    if (typeof _cb === 'function' && _cb) {
      _cb();
    }
  };




  // Inject Options to DOM
  function injectOptions() {
    if (_injected || document.body.contains(_backdrop) || document.body.contains(_modal)) {
      return;
    }

    _backdrop.appendChild(_modal);
    document.body.appendChild(_backdrop);

    _injected = true;

    // Trigger Window getting styles for css3
    return window.getComputedStyle(_backdrop).height;
  }




  // Parse Template html to fix relative paths
  function parseTemplate(template) {
    template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

    return _.createElement(template);
  }



  // Return Object for Modularity
  return PMOptions;
})(PlayMidnightUtilities);
