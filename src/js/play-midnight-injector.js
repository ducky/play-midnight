var PlayMidnightInjector = (function(_){
    'use strict';

    // Our Friend
    var PMInjector = {};


    // Load Options Templates and Inject
    function loadTemplates(_temps, cb) {
        var promises = [];

        // Invalid Templates
        if (!_temps || typeof _temps !== 'object') {
            if (typeof cb === 'function') {
                cb(_temps);
            }
            return;
        }

        // Load Up Promises
        for (var key in _temps) {
            console.log(_temps[key]);
            if (!_temps[key] || !_temps[key].hasOwnProperty('url')) {
                continue;
            }

            promises.push(
                _.$http.get(_temps[key].url)
            );
        }

        console.log(promises);
        // No Templates had URLS
        if (!promises.length) {
            console.log('No promises created');
            if (typeof cb === 'function') {
                cb(_temps);
            }
            return;
        }

        // Load ALL Templates before injecting
        Promise.all(promises)
            .then(function(templateHtml) {
                // Populate Returned Templates
                var i = 0;
                for (var key in _temps) {
                    _temps[key].html = parseTemplate(templateHtml[i]) || '';
                    _temps[key].element = _.createElement(_temps[key].html) || document.createElement('div');
                    i++;
                }

                if (typeof cb === 'function') {
                    _.log(_temps);
                    cb(_temps);
                }
            });
    }


    // Load Options Templates and Inject
    function injectTemplates(_temps, cb) {
        var target;

        _.log('Starting Load Templates: %s', JSON.stringify(_temps));
        loadTemplates(_temps, function(templates) {
            _.log('Injecting Templates');

            // No Templates?
            if (!templates || typeof templates !== 'object') {
                _.log('No Templates loaded?');
                if (typeof cb === 'function') {
                    cb();
                }
                return;
            }

            for (var key in templates) {
                target = document.querySelector(templates[key].target);
                target.appendChild(templates[key].element);

                // Register Events, If Given
                if (typeof templates[key].events === 'function') {
                    templates[key].events(templates[key].element);
                }
            }

            if (typeof cb === 'function') {
                cb();
            }
        });
    }


    // Parse Template html to fix relative paths
    function parseTemplate(template) {
        template = template.replace(/\{CHROME_DIR\}/, chrome.extension.getURL('/dist'));

        return template;
    }


    // Add to utils
    _.inject = injectTemplates;


    // Return Object for Modularity
    return PMInjector;
})(PlayMidnightUtilities);
