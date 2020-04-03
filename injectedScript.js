let URL = window.__data__.viewMp4Url

function insertButton(){
  if(!window.jQuery) {
    setTimeout(insertButton, 100)
  } else {
    $(document).ready(function() {

      $('.r-header-row').append(`
          <div id="btn">Download Meeting Video</div>
          <div class="modal-wrapper">
        <div class="modal">
          <div class="close-button">X</div>
          <ol>
            <li>Right click <a id="videoLink" href="javascript:void()">this link</a></li>
            <li>Choose "Save link as..."</li>
            <li>Your browser will now download the video to the chosen location</li>
          </ol>
        </div>
      </div>
          `)
  
  
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