var PlayMidnightInjector = (function(_){
    'use strict';

    // Our Friend
    var PMInjector = {};


    // Load Options Templates and Inject
    function loadTemplates(_temps, cb) {
        var promises = [],
            templates = [],
            template;

        // Array Of Templates
        if (Array.isArray(_temps) && _temps.length > 0) {
            // Load Up Promises
            for (var i = 0, len = _temps.length; i < len; i++) {
                if (!_temps[i] || !_temps[i].hasOwnProperty('url')) {
                    continue;
                }

                promises.push(
                    _.$http.get(_temps[i].url)
                );
            }

            // No Templates had URLS
            if (!promises.length) {
                if (typeof cb === 'function') {
                    cb(templates);
                }
                return;
            }

            // Load ALL Templates before injecting
            Promise.all(promises)
                .then(function(templateHtml) {
                    // Populate Returned Templates
                    for (var i = 0, len = _temps.length; i < len; i++) {
                        template = _temps[i];

                        templates.push({
                            url: template.url,
                            target: template.target || 'body',
                            events: template.events || function() {},
                            html: templateHtml[i] || '',
                            element: _.createElement(templateHtml[i]) || document.createElement('div')
                        });
                    }

                    if (typeof cb === 'function') {
                        _.log(templates);
                        cb(templates);
                    }
                });

        // Single Template
        } else {
            // No Template or Template URL
            if (!_temps || !_temps.hasOwnProperty('url')) {
                if (typeof cb === 'function') {
                    cb(templates);
                }
                return;
            }

            // Load Single Template
            _.$http.get(_temps.url)
                .then(function(templateHtml) {
                    templates.push({
                        url: _temps.url,
                        target: _temps.target || 'body',
                        events: _temps.events || function() {},
                        html: templateHtml || '',
                        element: _.createElement(templateHtml) || document.createElement('div')
                    });

                    if (typeof cb === 'function') {
                        cb(templates);
                    }
                });
        }
    }


    // Load Options Templates and Inject
    function injectTemplates(_temps, cb) {
        var target,
            template;

        _.log('Starting Load Templates: %s', JSON.stringify(_temps));
        loadTemplates(_temps, function(templates) {
            _.log('Injecting Templates');

            if (!templates.length) {
                _.log('No Templates loaded?');
            }

            for (var i = 0, len = templates.length; i < len; i++) {
                template = templates[i];

                target = document.querySelector(template.target);
                target.appendChild(template.element);

                // Register Events, If Given
                if (typeof template.events === 'function') {
                    template.events(template.element);
                }
            }

            if (typeof cb === 'function') {
                cb(templates);
            }
        });
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

        return _.createElement(template);
    }


    // Add to utils
    _.inject = injectTemplates;


    // Return Object for Modularity
    return PMInjector;
})(PlayMidnightUtilities);
