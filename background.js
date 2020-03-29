var tab;

// Called when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed: " + Date());
});

// Called when a Chrome runtime message is received
chrome.runtime.onMessage.addListener(function(message, callback) {
	if (message.action == "loaded") {
		chrome.pageAction.show(callback.tab.id);
		tab = callback.tab;
	}
	console.log(message);
});

// Called when the user clicks on the browser extension icon
chrome.pageAction.onClicked.addListener(function(tab) {
  console.log("User clicked the button! " + Date());
	chrome.tabs.sendMessage(tab.id, { action: "clicked", data: null }, function (response) {
    console.log("Received response");
    console.log(response);

    return true;
	});
});
