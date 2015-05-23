var PlayMidnightOptions = (function(_, PlayMidnight){
    'use strict';

    // Our Friend
    var PMOptions = {};

    var _injected = false,
        _menuOpen = false,
        _backdrop = document.createElement('div'),
        _modal = document.createElement('div'),
        _cb;


    // Various Templates
    var _templates = {};

    _templates.optionsPage = {
        name: 'optionsPage',
        url: chrome.extension.getURL('dist/templates/options.html'),
        target: 'body'
    };

    _templates.menuItem = {
        name: 'menuItem',
        url: chrome.extension.getURL('dist/templates/options-menu.html'),
        target: '#nav_collections',
        events: function(ele) {
            ele.addEventListener('click', function(e) {
                // Prevent Click Bubbling to Document
                if (!_menuOpen) {
                    e.stopPropagation();
                }

                showOptions();
            }, false);
        }
    };


    // Load Options Templates and Inject
    function createOptions() {
        console.log(_templates);
        _.inject(_templates, function() {
            console.log(_templates);
            // for (var i = 0, len = injected.length; i < len; i++) {
            //     template = injected[i];
            // }
        });
    }


    // Listener for Document.click when Menu is open
    function handleClick(e) {
        if (_menuOpen &&!_.isClicked(e.target, _templates.optionsPage.element)) {
            hideOptions();
        }
    }


    // Show Options Page
    function showOptions() {
        document.addEventListener('click', handleClick, false);
        document.body.classList.add('is-pm-options');
        _menuOpen = true;
    }


    // Hide Options Page
    function hideOptions() {
        document.removeEventListener('click', handleClick);
        document.body.classList.remove('is-pm-options');
        _menuOpen = false;
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

        return _.createElement(template);
    }


    // Add Options to Object
    PMOptions.create = createOptions;
    PMOptions.show = showOptions;
    PMOptions.hide = hideOptions;


    // Add To Core
    PlayMidnight.Options = PMOptions;


    // Return Object for Modularity
    return PMOptions;
})(PlayMidnightUtilities, PlayMidnight);
