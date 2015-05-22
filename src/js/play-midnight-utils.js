var PlayMidnightUtilities = (function(){
	'use strict';

	// Our Friend
	var PMUtils = {};

	var _verbose = false;


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
			ajax : function (method, url, args) {
				var promise = new Promise(function (resolve, reject) {
					var client = new XMLHttpRequest();
					var uri = url;

					client.open(method, uri);
					client.send();

					client.onload = function () {
						if (this.status == 200) {
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
			'get' : function(url) {
				return core.ajax('GET', url);
			}
		};
	}();


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
})();
