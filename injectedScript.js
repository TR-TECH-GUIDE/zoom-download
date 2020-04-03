let URL = window.__data__.viewMp4Url

function insertButton(){
  if(!window.jQuery) {
    setTimeout(insertButton, 100)
  } else {
    $(document).ready(function() {
      // Remove the old download button, if it exists
      $('.download').remove()

      // Add the download button to the page
      // NOTE: Indentation reduced so it injects with proper spacing
      $('.r-header-row').append(`
<div id="btn"><i class="zm-icon-download mgr-xs"></i>Download Video</div>
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

      // Display download instructions with valid download URL (in modal)
      $("#btn").click(function() {
        $(".modal-wrapper")
          .css("display", "flex")
          .hide()
          .fadeIn();
          $('#videoLink').attr('href', URL);
          $('#videoLink').attr('download', window.__data__.topic);
      });
      $('.close-button').click(function() {
        $('.modal-wrapper').fadeOut();
      })
      $(".modal-wrapper")
        .click(function() {
          $(this).fadeOut();
        })
        .children()
        .click(function(e) {
          return false;
        });
    });
  }
}

insertButton()
