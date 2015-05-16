function showNotification(type, version) {
	var notificationText = '';
	var subtitle = '';

	switch ( type ) {
		case 'install':
			subtitle = 'Thanks for installing Play Midnight!';
			notificationText = 'Play Midnight settings are built right into Google Play Music. Look for the Play Midnight icon below your Google+ picture.';
			break;
		case 'update':
			subtitle = 'Play Midnight Updated!';
			if ( version === '2.0.0' ) {
				notificationText = 'Play Midnight has been mostly updated for Google Material UI, bear with me while I tackle some bugs.';
			} else {
				return;
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

function checkInstall(details) {
	var thisVersion = chrome.runtime.getManifest().version;

	showNotification( details.reason, thisVersion );
}

chrome.runtime.onInstalled.addListener(checkInstall);