var hostId = $("#host-id");
var hostButton = $("#host-button");
hostId.val("12345245235475");
hostId.click(function() {
	this.select();
});

hostId.keydown(function(e) {
	if (e.keyCode == 67 && e.ctrlKey) {
		onHostSelected();
	}
});
hostButton.click(function() {
	onHostSelected();
});

var guestId = $('#guest-id');
var guestButton = $('#guest-button');

guestButton.click(function() {
	onGuestSelected();
});

onGuestSelected = function() {

	getCurrentTab(function(tabId) {
		chrome.browserAction.setIcon({
			path: "icons/icon_blue.png",
			tabId: tabId
		}, function() {
			chrome.tabs.executeScript(null, {
				file: 'vendor/socket.io-1.0.6.js'
			});
			chrome.tabs.executeScript(null, {
				file: 'guestInjection.js'
			});

			var bg = chrome.extension.getBackgroundPage();
			bg.registredPages[tabId] = "guest";

			window.close();
		});
	});
}

onHostSelected = function() {

	getCurrentTab(function(tabId) {
		chrome.browserAction.setIcon({
			path: "icons/icon_green.png",
			tabId: tabId
		}, function() {
			chrome.tabs.executeScript(null, {
				file: 'vendor/socket.io-1.0.6.js'
			});
			chrome.tabs.executeScript(null, {
				file: 'hostInjection.js'
			});

			var bg = chrome.extension.getBackgroundPage();
			bg.registredPages[tabId] = "host";

			window.close();
		});
	});
}

function getCurrentTab(callback) {
	chrome.tabs.query(
		{ currentWindow: true, active: true },
		function (tabArray) {
			callback(tabArray[0].id);
		}
	);
}
