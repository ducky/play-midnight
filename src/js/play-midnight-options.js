var PlayMidnightOptions = (function(_){
  'use strict';

  // Our Friend
  var PMOptions = {};

  var _injected = false,
      _menuOpen = false,
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
        menuItem.addEventListener('click', function(e) {
          if (!_menuOpen) {
            e.stopPropagation();
          }

          showOptions();
        }, false);
    });
  };


  function handleClick(e) {
    if (_menuOpen &&!_.isClicked(e.target, _templates.optionsPage.element)) {
      hideOptions();
    }
  }

  // Show Options Page
  function showOptions() {
    document.addEventListener('click', handleClick, false);
    _templates.optionsPage.element.classList.add('visible');
    _menuOpen = true;
  }

  function hideOptions() {
    document.removeEventListener('click', handleClick);
    _templates.optionsPage.element.classList.remove('visible');
    _menuOpen = false;
  }

  // Show Options
  PMOptions.show = showOptions;
  PMOptions.hide = hideOptions;


  // Parse Template html to fix relative paths
  function parseTemplate(template) {
    template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

    return _.createElement(template);
  }



  // Return Object for Modularity
  return PMOptions;
})(PlayMidnightUtilities);
