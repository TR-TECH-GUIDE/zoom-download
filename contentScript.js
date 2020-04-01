var inject = "(" + function() {
    var a = document.createElement("a");
    a.appendChild(document.createTextNode('Right Click & "Save As" to Download...'));
    a.style = "display: block; margin: auto; margin-top: 25px; margin-bottom: 25px; min-width: 150px; max-width: 36ch; padding: 10px; border: 5px solid; border-radius: 3px; color: #2d8cff; text-align: center; font-family: sans-serif; font-size: 1.25em; text-decoration: none; margin-right: 25px;";
    a.href = window.__data__.viewMp4Url;
    // a.download = window.__data__.topic;
    a.download = "video.mp4";
    document.body.insertBefore(a, document.body.childNodes[0]);
} + ")();";
console.log(inject);
var script = document.createElement("script");
script.textContent = inject;
(document.head||document.documentElement).appendChild(script);
script.remove();

function runScript(name) {
  var s = document.createElement('script');
  // TODO: add "script.js" to web_accessible_resources in manifest.json
  s.src = chrome.runtime.getURL(name);
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

// If the extension is clicked, send back document content including the link
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "clicked") {
    // var inject = "(" + function() {
    //   var a = document.createElement("a");
    //   a.appendChild(document.createTextNode("Right Click & Save As..."));
    //   a.style = "display: block; margin: auto; margin-top: 25px; margin-bottom: 25px; min-width: 150px; max-width: 350px; padding: 15px; border: 3px solid limegreen; border-radius: 3px; background: black; color: limegreen; text-align: center; font-family: sans-serif; font-size: 1.5em; text-decoration: none;";
    //   a.href = window.__data__.viewMp4Url;
    //   a.download = window.__data__.topic;
    //   document.body.insertBefore(a, document.body.childNodes[0]);
    // } + ")();";
    // var script = document.createElement("script");
    // script.textContent = inject;
    // (document.head||document.documentElement).appendChild(script);
    // script.remove();

    // var s = document.createElement('script');
    // s.src = chrome.runtime.getURL('script.js');
    // s.onload = function() {
    //     this.remove();
    // };
    runScript('jquery.js')
    runScript('script.js')
	}

  sendResponse();
  return true;
});
