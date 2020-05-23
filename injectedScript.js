const URL = window.__data__.viewMp4Url;
const fileSize = window.__data__.fileSize;
const chats = window.__data__.chatlist;
const topic = window.__data__.topic;

function insertButton() {
  // Remove the old download button, if it exists
  document.querySelectorAll(".download").forEach((b) => b.remove());

  // Add the download button to the page
  // NOTE: Indentation reduced so it injects with proper spacing
  document.querySelector(".r-header-row").insertAdjacentHTML("beforeend", `
<div id="btn"><i class="zm-icon-download mgr-xs"></i>Download Video (${fileSize})</div>
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
    console.log(getComputedStyle(modalWrapper, "transition").opacity);
    modalWrapper.style.display = "flex";
    // TODO: Figure out why this ugly setTimeout hack is necessary
    setTimeout(() => modalWrapper.style.opacity = 1, 10);

    const videoLink = document.querySelector("#videoLink");
    videoLink.href = URL;
    videoLink.download = `${topic}.mp4`;
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
  insertButton();
} else {
  document.body.addEventListener("load", insertButton);
}
