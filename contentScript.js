// Send a message to the background page when the script is successfully injected
var msg = { action: "loaded", data: null };
chrome.runtime.sendMessage(msg);

// If the extension is clicked, send back document content including the link
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "clicked") {
    var inject = "(" + function() {
      var a = document.createElement("a");
      a.appendChild(document.createTextNode("Right Click & Save As..."));
      a.style = "display: block; margin: auto; margin-top: 25px; margin-bottom: 25px; min-width: 150px; max-width: 350px; padding: 15px; border: 3px solid limegreen; border-radius: 3px; background: black; color: limegreen; text-align: center; font-family: sans-serif; font-size: 1.5em; text-decoration: none;";
      a.href = window.__data__.viewMp4Url;
      a.download = window.__data__.topic;
      document.body.insertBefore(a, document.body.childNodes[0]);
    } + ")();";
    var script = document.createElement("script");
    script.textContent = inject;
    (document.head||document.documentElement).appendChild(script);
    script.remove();

	}

  sendResponse();
  return true;
});
