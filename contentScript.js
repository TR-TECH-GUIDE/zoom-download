/*
 * Inject a script file into the main web page
 */
function runScript(name) {
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL(name);
  // s.onload = function() {
  //     this.remove();
  // };
  (document.head || document.documentElement).appendChild(s);
}

// Inject JQuery and then the custom script
runScript('jquery.js')
runScript('injectedScript.js')

// TODO: See if this is necessary
//setTimeout(() => {runScript('injectedScript.js')}, 1000)
