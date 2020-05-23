/*
 * Inject a script file into the main web page
 */
function runScript(name) {
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL(name);
  (document.head || document.documentElement).appendChild(s);
}

runScript('injectedScript.js')
