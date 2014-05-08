function showNotification(type, version) {
	var notificationText = '';
	var subtitle = '';
	
	switch ( type ) {
		case 'install':
			subtitle = 'Thanks for installing Play Midnight!';
			notificationText = 'Modify settings (including color changes) by clicking the Play Midnight icon located on the right side of your URL bar while viewing Google Play Music.';
			break;
		case 'update':
			if ( version === '1.1.0' ) {
				subtitle = 'Play Midnight Updated!';
				notificationText = 'Modify settings (including color changes) by clicking the Play Midnight icon located on the right side of your URL bar while viewing Google Play Music.';
			}
			break;
		default:
			return;
	}

	var opt = {
		type: "basic",
		title: 'Play Midnight for Google Play Music™',
		message: notificationText,
		contextMessage: subtitle,
		iconUrl: chrome.extension.getURL('icon48.png')
	};
	chrome.notifications.create('pm', opt, function() {});
}

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
	var url = new RegExp( '^https?://play.google.com/music/listen' );
	if ( url.test( tab.url ) ) {
		chrome.pageAction.show(tabId);
	}
}
chrome.tabs.onUpdated.addListener(checkURL);

function checkInstall(details) {
	var thisVersion = chrome.runtime.getManifest().version;

	showNotification( details.reason, thisVersion );
}

chrome.runtime.onInstalled.addListener(checkInstall);