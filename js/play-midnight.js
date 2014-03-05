var PlayMidnight = {
	init: function() {
		this.injectStyle();
		this.addCredits();
	},

	injectStyle: function() {
		var style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = chrome.extension.getURL('css/play-midnight.css');
		(document.head||document.documentElement).appendChild(style);
	},

	addCredits: function() {
		var divider = document.createElement('div');
		divider.className = "nav-section-divider";

		var creditsHead = document.createElement('div');
		creditsHead.className = "nav-section-header";
		creditsHead.innerHTML = "PLAY MIDNIGHT";

		var credits = document.createElement('ul');
		credits.id = "play-midnight";

		var creditsMe = document.createElement('li');
		creditsMe.className = "nav-item-container";
		creditsMe.innerHTML = "<a href=\"http://christieman.com/\">By Chris Tieman</a>";
		credits.appendChild(creditsMe);

		var creditsDonate = document.createElement('li');
		creditsDonate.className = "nav-item-container";
		creditsDonate.innerHTML = "<a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KHH9ZJH42FF4J\">Donate</a>";
		credits.appendChild(creditsDonate);

		var nav = document.getElementById('nav')
		nav.appendChild(divider);
		nav.appendChild(creditsHead);
		nav.appendChild(credits);
	}
};

PlayMidnight.init();