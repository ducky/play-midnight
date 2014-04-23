function openOrFocusOptionsPage() {
	var optionsUrl = chrome.extension.getURL('assets/options.html');
	
	chrome.tabs.query({}, function(extensionTabs) {
		var found = false;
		for (var i=0; i < extensionTabs.length; i++) {
			if (optionsUrl === extensionTabs[i].url) {
				found = true;
				chrome.tabs.update(extensionTabs[i].id, {"selected": true});
			}
		}
		
		if ( !found ) {
			chrome.tabs.create ( { url: "assets/options.html" } );
		}
	});
}
chrome.pageAction.onClicked.addListener(openOrFocusOptionsPage);

function checkURL(tabId, info, tab) {
	var url = new RegExp( '^https?:\/\/play\.google\.com\/music\/listen' );
	if ( url.test( tab.url ) ) {
		chrome.pageAction.show(tabId);
	}
}
chrome.tabs.onUpdated.addListener(checkURL);