const URL = window.__data__.viewMp4Url;
const fileSize = window.__data__.fileSize;
const chats = window.__data__.chatList;
const topic = window.__data__.topic;


// Parse a poorly-formatted chat message time into a time valid for use in SRT
// subtitle files
function parseStartTime(rawTime) {
  const reg = /(\d+):(\d+)(:(\d+))?/;
  const match = rawTime.match(reg);
  // Whether or not the "hour" value is specified
  if (match[4] == undefined) {
    return `00:${match[1]}:${match[2]},000`;
  } else {
    return `${match[1]}:${match[2]}:${match[4]},000`;
  }
}


// Calculate the end time for a subtitle based on the start time and message
// length using a very simple formula. Most of the logic here is making sure to
// handle overflows from seconds -> minutes -> hours correctly.
function calculateEndTime(startTime, message) {
  const reg = /(\d+):(\d+):(\d+),000/;
  const match = startTime.match(reg);
  let addTime = 5 + (0.2 * message.length);
  let seconds = parseInt(match[3]) + addTime;
  let minutes = Math.floor(parseInt(match[2]) + Math.floor(seconds / 60));
  seconds %= 60;
  let millis = Math.floor((seconds % 1) * 100);
  seconds = Math.floor(seconds)
  let hours = Math.floor(parseInt(match[1]) + Math.floor(minutes / 60));
  minutes %= 60;
  return `${hours}:${minutes}:${seconds},${millis}`;
}


// Process chat message objects into valid subtitle file for downloaded video
function toSubRip(subLink) {
  // Build up an output in SRT format
  output = "";
  for (let i=0; i < chats.length; i++) {
    let chat = chats[i];
    let message = chat.content;
    let startTime = parseStartTime(chat.time);
    let endTime = calculateEndTime(startTime, message);
    let sender = chat.username;
    output += `
${i + 1}
${startTime} --> ${endTime}
${sender}: ${message}
`;
  }

  // Set the SRT to download when the button is clicked
  subLink.href = `data:text/plain,${output}`;
}


function insertButtons() {
  // Remove the old download button, if it exists
  document.querySelectorAll(".download").forEach((b) => b.remove());

  // Set a file title by parsing the date from the URL
  const dateRegex = /ssrweb.zoom.us\/[^\/]*\/replay\/(\d+)\/(\d+)\/(\d+)/;
  const dateMatch = URL.match(dateRegex, URL);
  const date = dateMatch[2] + dateMatch[3] + dateMatch[1];
  const title = topic + "_" + date;

  // Add a subtitles button to the page
  const headerRow = document.querySelector(".r-header-row");
  headerRow.insertAdjacentHTML("beforeend", `
<a id="subtitleButton" href="">
<div class="btn"><i class="zm-icon-download mgr-xs"></i>Download Chat</div>
</a>
`);
  const subLink = document.querySelector("#subtitleButton");
  subLink.download = `${title}.srt`;
  toSubRip(subLink);

  // Add the download button to the page
  // NOTE: Indentation reduced so it injects with proper spacing
  headerRow.insertAdjacentHTML("beforeend", `
<div id="btn" class="btn"><i class="zm-icon-download mgr-xs"></i>Download Video (${fileSize})</div>
<div class="modal-wrapper">
  <div class="modal">
    <div class="close-button">&times;</div>
    <ol>
      <li>Right click <a id="videoLink" href="javascript:;">this link</a></li>
      <li>Choose "Save link as..."</li>
      <li>The video will download</li>
    </ol>
  </div>
</div>
`);

  const modalWrapper = document.querySelector(".modal-wrapper");

  // Display download instructions with valid download URL (in modal)
  document.querySelector("#btn").addEventListener("click", () => {
    modalWrapper.style.display = "flex";
    // TODO: Figure out why this ugly setTimeout hack is necessary
    setTimeout(() => modalWrapper.style.opacity = 1, 10);

    const videoLink = document.querySelector("#videoLink");
    videoLink.href = URL;
    videoLink.download = `${title}.mp4`;
  });

  // Handle closing the modal
  document.querySelector(".close-button").addEventListener("click", () => {
    modalWrapper.style.opacity = 0;
    setTimeout(() => modalWrapper.style.display = "none", 400);
  });
  modalWrapper.addEventListener("click", () => {
    modalWrapper.style.opacity = 0;
    setTimeout(() => modalWrapper.style.display = "none", 400);
  });
}

// Either add the button, or set it to be added when the document loads
if (document.readyState == "complete" || document.readyState == "interactive") {
  insertButtons();
} else {
  document.body.addEventListener("load", insertButtons);
}
