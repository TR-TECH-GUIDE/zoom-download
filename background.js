var tab;

// Called when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed: " + Date());
});

// Called when a Chrome runtime message is received
chrome.runtime.onMessage.addListener(function(message, callback) {
  // When the content script is successfully loaded, it sends a message
	if (message.action == "loaded") {
		chrome.pageAction.show(callback.tab.id);
		tab = callback.tab;
	}
	console.log(message);
});

// Called when the user clicks on the browser extension icon
chrome.pageAction.onClicked.addListener(function(tab) {
  console.log("User clicked the button! " + Date());
  // Send the content script a data request and download the video upon response
	chrome.tabs.sendMessage(tab.id, { action: "clicked", data: null }, function (response) {
    var url = response.viewMp4Url;
    console.log(url);

    chrome.downloads.download({
      url: url,
      headers: [ { name: "Referer", value: "http://zoom.us/" } ]
    });

    return true;
	});
});
