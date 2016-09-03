/* global PlayMidnightBrowser, Promise */
var PlayMidnightUtilities = (function (Browser) {
  'use strict';

  // Our Friend
  var PMUtils = {
    browser: Browser, // Add Browser Save/Get/URL Tools
    callback: callback,
    createElement: createElement,
    empty: empty,
    equalObjects: equalObjects,
    garbage: garbage,
    getParentElement: getParentElement,
    $http: $http(),
    insertAfter: insertAfter,
    isClicked: nodesMatch,
    log: log,
    nodesMatch: nodesMatch,
    remove: remove,
    replace: replace,
    replaceAllSVG: replaceAllSVG,
    setVerbose: setVerbose,
    toTitleCase: toTitleCase,
    verbose: verbose,
    versionCompare: versionCompare
  };

  // Verbose Mode (console fun stuffs)
  var _verbose = false;

  // Return Object for Modularity
  return PMUtils;

  ///////////////////////////////////////////////////////////////////////


  //
  // Public Utilities
  //


  // Check for and call callback if it exists
  function callback(cb) {
    if (cb && typeof cb === 'function') {
      cb();
    }
  }


  // Create Element from html string
  function createElement(html) {
    var temp = document.createElement('div');

    temp.innerHTML = html;
    return temp.childNodes[0];
  }


  // Empty Node
  function empty(element) {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  }


  // Check (Vaguely) for Object equality
  function equalObjects(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }

    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  }


  // Eat Fake Function Call (CSS3 Transitions with getComputedStyle)
  function garbage() {
    return true;
  }


  // Get Parent with class/id
  function getParentElement(el, search) {
    while (el.parentNode) {
      if (el.classList.contains(search) || el.id === search) {
        return el;
      }

      el = el.parentNode;
    }

    return document.createElement('div'); // returns an Array []
  }


  // Sample stub $http Utility
  function $http() {
    var core = {
      ajax: function (method, url, args) {
        var promise = new Promise(function (resolve, reject) {
          var client = new XMLHttpRequest();
          var uri = url;

          client.open(method, uri);
          client.send();

          client.onload = function () {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(this.statusText);
            }
          };

          client.onerror = function () {
            reject(this.statusText);
          };
        });

        return promise;
      }
    };

    return {
      'get': function (url) {
        return core.ajax('GET', url);
      }
    };
  }


  // Insert Element After Node
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }


  // Log to console if verbose
  function log() {
    if (_verbose) {
      console.log.apply(console, arguments);
    }
  }


  // Check if Nodes Match
  function nodesMatch(element, target) {
    while (element) {
      if (element === target) {
        return true;
      }
      element = element.parentNode;
    }

    return false;
  }


  // Remove Element from DOM
  function remove(element) {
    var ele;

    if (isNodeList(element)) {
      for (var i = 0, len = element.length; i < len; i++) {
        ele = element[i];

        if (ele.parentNode) {
          ele.parentNode.removeChild(ele);
        }
      }
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }


  // Replace element in DOM with different element
  function replace(oldNode, newNode) {
    oldNode.parentNode.replaceChild(newNode, oldNode);
  }


  // Replace svg images with their contents
  function replaceAllSVG() {
    var svgs = document.querySelectorAll('img[src $= ".svg"]');

    if (!svgs || !svgs.length) {
      return;
    }

    for (var i = 0, len = svgs.length; i < len; i++) {
      var img = svgs[i];
      var url = img.src;

      (function (img, url) {
        var id = img.id;
        var classList = img.classList.toString().split(' ');

        $http().get(url)
          .then(function (contents) {
            var svg = createElement(contents);

            if (id) {
              svg.id = id;
            }

            for (var j = 0; j < classList.length; j++) {
              var singleClass = classList[j];
              svg.classList.add(singleClass);
            }

            PMUtils.replace(img, svg);
          });
      }(img, url));
    }
  }


  // Set Verbose
  function setVerbose(verbose) {
    _verbose = verbose;
  }


  // Title Case
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


  // Check if Verbose
  function verbose() {
    return _verbose;
  }


  // Return Comparison of version compare
  // -1: a < b
  // 0: a === b
  // 1: a > b
  function versionCompare(a, b) {
    if (a === b) {
      return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);

    for (var i = 0; i < len; i++) {
      if (parseInt(a_components[i]) > parseInt(b_components[i])) {
        return 1;
      }

      if (parseInt(a_components[i]) < parseInt(b_components[i])) {
        return -1;
      }
    }

    if (a_components.length > b_components.length) {
      return 1;
    }

    if (a_components.length < b_components.length) {
      return -1;
    }

    return 0;
  }




  //
  // Private Helpers
  //

  // Check if node is a nodeList
  function isNodeList(nodes) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
      /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr);
  }

})(PlayMidnightBrowser);
