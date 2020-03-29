// Send a message to the background page when the script is successfully injected
var msg = { action: "loaded", data: null };
chrome.runtime.sendMessage(msg);

// If the extension is clicked, send back document content including the link
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "clicked") {
    // Loop over all of the <script> elements -- kind of a janky hack
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var text = scripts[i].text;
      // Find the <script> with the viewMp4Url
      if (text.search(/viewMp4Url/i) >= 1) {
        // TODO: Fix to not just eval the the script
        eval(text);
        sendResponse(window.__data__);
      }
    }
	}

  return true;
});
