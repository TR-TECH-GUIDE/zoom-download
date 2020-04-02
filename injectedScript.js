let URL = window.__data__.viewMp4Url

// This should not loop forever, but will if jQuery is never loaded
// TODO: Figure out a better way
while (!window.jQuery) { }

$(document).ready(function() {
    // Remove the old download button, if it exists
    $('.download').remove()

    // Add the download button to the page
    // NOTE: Indentation reduced so it inserts with proper spacing
    $('.r-header-row').append(`
<div id="btn"><i class="zm-icon-download mgr-xs"></i>Download Video</div>
<div class="modal-wrapper">
  <div class="modal">
    <ol>
      <li>Right click <a id="videoLink" href="javascript:;">this link</a></li>
      <li>Choose "Save link as..."</li>
      <li>The video will download</li>
    </ol>
  </div>
</div>
`);

    // Display download instructions with valid download URL
    $("#btn").click(function() {
      console.log('' + window)
      $(".modal-wrapper")
        .css("display", "flex")
        .hide()
        .fadeIn();
        $('#videoLink').attr('href', URL);
        $('#videoLink').attr('download', window.__data__.topic);
    });
    $(".modal-wrapper")
      .click(function() {
        $(this).fadeOut();
      })
      .children()
      .click(function(e) {
        return false;
      });
});
