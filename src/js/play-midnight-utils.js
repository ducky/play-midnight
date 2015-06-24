/* global PlayMidnightBrowser, Promise */
var PlayMidnightUtilities = (function(Browser){
	'use strict';

	// Our Friend
	var PMUtils = {};

	var _verbose = false;

	// Add Browser Save/Get/URL Tools
	PMUtils.browser = Browser;

	// Check if Verbose
	PMUtils.verbose = function() {
		return _verbose;
	};


	// Set Verbose
	PMUtils.setVerbose = function(verbose) {
		_verbose = verbose;
	};


	// Log to console if verbose
	PMUtils.log = function() {
		if (_verbose) {
			console.log.apply(console, arguments);
		}
	};


	// Sample stub $http Utility
	PMUtils.$http = function(){
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
			'get': function(url) {
				return core.ajax('GET', url);
			}
		};
	}();


	// Check (Vaguely) for Object equality
	PMUtils.equalObjects = function(a, b) {
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
	};


	// Title Case
	PMUtils.toTitleCase = function(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};


	// Empty Node
	PMUtils.empty = function(element) {
		while (element.lastChild) {
		    element.removeChild(element.lastChild);
		}
	};


	// Check if Nodes Match
	PMUtils.nodesMatch = function(element, target) {
		while (element) {
			if (element === target) {
				return true;
			}
			element = element.parentNode;
		}

		return false;
	};
	// Alias for Nodes Match
	PMUtils.isClicked = PMUtils.nodesMatch;


	// Remove Element from DOM
	PMUtils.remove = function(element) {
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
	};


	// Insert Element After Node
	PMUtils.insertAfter = function(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	};


	// Create Element from html string
	PMUtils.createElement = function(html) {
		var temp = document.createElement('div');

		temp.innerHTML = html;
		return temp.childNodes[0];
	};


	// Get Parent with class/id
	PMUtils.getParentElement = function(el, search) {
	    while (el.parentNode) {
	        if (el.classList.contains(search) || el.id === search) {
				return el;
			}

	        el = el.parentNode;
	    }

		return document.createElement('div'); // returns an Array []
	};


	// Return Comparison of version compare
	// -1: a < b
	// 0: a === b
	// 1: a > b
	PMUtils.versionCompare = function(a, b) {
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
	};


	// Eat Fake Function Call (CSS3 Transitions with getComputedStyle)
	PMUtils.garbage = function() {
		return true;
	};


	//
	// Private Helpers
	//

	// Check if node is a nodeList
	function isNodeList(nodes) {
		var stringRepr = Object.prototype.toString.call(nodes);

		return typeof nodes === 'object' &&
			/^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
			nodes.hasOwnProperty('length') &&
			(nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
	}


	// Return Object for Modularity
	return PMUtils;
})(PlayMidnightBrowser);
