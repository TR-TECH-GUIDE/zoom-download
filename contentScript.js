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

