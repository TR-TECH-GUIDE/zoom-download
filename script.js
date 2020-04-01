let URL = window.__data__.viewMp4Url
$(document).ready(function() {

    $('.r-header-row').append(`
        <div id="btn">Download Meeting Video</div>
        <div class="modal-wrapper">
			<div class="modal">
				<ol>
					<li>Right click <a id="videoLink" href="javascript:void()">this link</a></li>
					<li>Choose "Save link as..."</li>
					<li>Your browser will now download the video to the chosen location</li>
				</ol>
			</div>
		</div>
        `)


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