// Send a message to the background page when the script is successfully injected
var msg = { action: "loaded", data: null };
chrome.runtime.sendMessage(msg);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "clicked") {
		console.log("Message received");
	}

  sendResponse(Object.keys(window));

  return true;
});
