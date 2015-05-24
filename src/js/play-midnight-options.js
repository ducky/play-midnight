/*global PlayMidnightUtilities, PlayMidnight */
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
        url: _.browser.url('dist/templates/options.html'),
        target: 'body'
    };

    _templates.menuItem = {
        name: 'menuItem',
        url: _.browser.url('dist/templates/options-menu.html'),
        target: '#nav .nav-section:last-child',
        append: 1,
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

    _templates.fabIcon = {
        name: 'fabIcon',
        url: _.browser.url('dist/templates/options-fab.html'),
        target: 'core-header-panel#content-container',
        enabled: function() {
            var userOptions = PlayMidnight.getUserOptions();
            return userOptions.fab;
        },
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
        _.inject(_templates, function() {
            var userOptions = PlayMidnight.getUserOptions(),
                options = PlayMidnight.getOptionsGraph(),
                optionsPage = _templates.optionsPage.element,
                optionsContainer = _templates.optionsPage.element.querySelector('section.options .options-container'),
                frag = buildOptions(options, userOptions),
                items;

            optionsContainer.appendChild(frag);
            optionsPage.querySelector('#pm-save-options').addEventListener('click', function() {
                saveOptions(userOptions);
            });

            document.body.classList.add('play-midnight-active');
        });
    }


    // Save Options
    function saveOptions(userOptions) {
        var optionsPage = _templates.optionsPage.element;
        var toSave = optionsPage.querySelectorAll('.play-midnight-option, .play-midnight-collection');
        var saveDialog = optionsPage.querySelector('.save-dialog');
        var options = {};

        for (var i = 0; i < toSave.length; i++) {
            var ele = toSave[i];
            var type = ele.dataset.type;
            var key = ele.dataset.key;

            if (type === 'boolean') {
                var checked = ele.querySelector('paper-toggle-button::shadow #toggleContainer').hasAttribute('checked');
                options[key] = checked;
            }

            if (type === 'array') {
                console.log(ele);
                var radio = ele.querySelector('input:checked');
                console.log(radio);
                var selected = _.getParentElement(radio, 'collection-item');
                var index = selected.dataset.index;
                var singleKey = selected.dataset.key;

                options[key] = userOptions[key];
                options[singleKey] = JSON.parse(JSON.stringify(userOptions[key][index]));
            }
        }

        _.browser.save(options, function(options) {
            saveDialog.classList.add('visible');
            setTimeout(function() {
                saveDialog.classList.remove('visible');

                setTimeout(function() {
                    location.reload();
                }, 1000);
            }, 2000);
        });
    }


    // Build Options
    function buildOptions(options, values) {
        var fragment, option, ele;

        fragment = document.createDocumentFragment();

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                option = options[key];

                if (option.type === 'section') {
                    ele = buildSection(key, option, values);
                    fragment.appendChild(ele);
                }

                if (option.type === 'array') {
                    ele = buildArray(key, option, values);
                    fragment.appendChild(ele);
                }

                if (option.type === 'boolean') {
                    ele = buildBoolean(key, option, values);
                    fragment.appendChild(ele);
                }
            }
        }

        return fragment;
    }


    // Build Section
    function buildSection(key, option, values) {
        var fragment = document.createDocumentFragment();

        var title = _.createElement('<h3 class="play-midnight-section-title"></h3>');
        title.classList.add('play-midnight-section-title');
        title.innerText = option.title;

        var content = buildOptions(option.options, values);

        fragment.appendChild(title);
        fragment.appendChild(content);

        return fragment;
    }


    // Build Array
    function buildArray(key, option, values) {
        var fragment = document.createDocumentFragment();

        // Build Header
        var details = _.createElement('<div class="play-midnight-option full"><div class="option-info"><div class="option-name"></div><div class="option-description"></div></div></div>');
        var title = document.createTextNode(option.title);
        var description = document.createTextNode(option.description);
        details.querySelector('.option-name').appendChild(title);
        details.querySelector('.option-description').appendChild(description);

        fragment.appendChild(details);

        // Build Collection
        var collectionEle = _.createElement('<div class="play-midnight-collection"></div>');
        collectionEle.dataset.type = option.type;
        collectionEle.dataset.key = key;

        var singleKey = option.single;
        var collection = values[key];
        for (var i = 0, len = collection.length; i < len; i++) {
            var singleItem = collection[i];

            var collectionItem = _.createElement('<div class="collection-item"><label><input type="radio" /><div class="fields"></div></label></div>');
            collectionItem.classList.add(singleKey);
            collectionItem.dataset.index = i;
            collectionItem.dataset.key = singleKey;
            collectionItem.dataset.collection = key;

            var radio = collectionItem.querySelector('input');
            radio.name = singleKey;

            if (_.equalObjects(singleItem, values[singleKey])) {
                collectionItem.classList.add('selected');
                radio.checked = true;
            }

            // Build Up Keys
            for (var metaKey in singleItem) {
                if (singleItem.hasOwnProperty(metaKey)) {
                    var meta = singleItem[metaKey];

                    if (metaKey === 'color') {
                        collectionItem.style.background = meta;
                    }

                    var itemField = _.createElement('<div class="field"></div>');
                    itemField.classList.add('field-' + metaKey);
                    itemField.innerText = meta;

                    collectionItem.querySelector('.fields').appendChild(itemField);
                }
            }

            collectionItem.addEventListener('click', function(e) {
                this.parentNode.querySelector('.selected').classList.remove('selected');
                this.classList.add('selected');
                this.querySelector('input').checked = true;
            });

            collectionEle.appendChild(collectionItem);
        }

        fragment.appendChild(collectionEle);

        return fragment;

        // Create Field
        // <div class="create"></div>
        // if (option.createable === true) {
        //     baby = option.collection[0].data;
        //     field = _.createElement('<h4 class="subtitle">Add New ' + _.toTitleCase(option.single) + '</h4>');
        //
        //     form = temp.querySelector('.create');
        //     form.id = 'pm-option-' + key;
        //
        //     form.appendChild(field);
        //
        //     for (var iKey in baby) {
        //         if (baby.hasOwnProperty(iKey)) {
        //             field = _.createElement('<paper-input-decorator label=""><input type="text" is="core-input" autofocus="" placeholder="" aria-label="Name" no-focus=""></paper-input-decorator>');
        //
        //             field.setAttribute('label', _.toTitleCase(iKey));
        //             field.querySelector('input').id = iKey;
        //
        //             form.appendChild(field);
        //         }
        //     }
        //
        //     form.appendChild(_.createElement('<div class="form-action"><sj-paper-button class="material-primary" role="button" tabindex="0" no-focus="">Create</sj-paper-button></div>'));
        // }


    }


    // Build Boolean
    function buildBoolean(key, option, values) {
        var fragment = document.createDocumentFragment();

        var details = _.createElement('<div class="play-midnight-option"><div class="option-info"><div class="option-name"></div><div class="option-description"></div></div><paper-toggle-button data-id="" checked="" data-original-value="" role="button" aria-pressed="" tabindex="0" touch-action="pan-y" no-focus=""></paper-toggle-button></div>');
        var title = document.createTextNode(option.title);
        var description = document.createTextNode(option.description);
        details.querySelector('.option-name').appendChild(title);
        details.querySelector('.option-description').appendChild(description);
        details.dataset.type = option.type;
        details.dataset.key = key;

        var checkbox = details.querySelector('paper-toggle-button');
        checkbox.setAttribute('data-id', key);
        checkbox.setAttribute('data-original-value', values[key] || false);
        checkbox.setAttribute('checked', values[key] || false);

        fragment.appendChild(details);

        return fragment;
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
        template = template.replace(/\{CHROME_DIR\}/, _.browser.url('/dist'));

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
