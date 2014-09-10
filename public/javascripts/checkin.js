// SPACE toggles manual entry
// SHIFT+SPACE toggles auto entry
$(document).ready(function() {
  $('form').find("input[type=text]").val(""); 
  $(document).keydown(function (e) {
    if (e.keyCode == 32) {
     $(".manual-input").toggle();
    }
  })
});

$("#checkin").submit(function(e) {
    $.ajax({
            type: "POST",
            url: "/checkin/action",
            data: $("#checkin").serialize(), // serializes the form's elements.
            success: function(data) { 
              $('<div class="alert alert-success" role="alert"></div>')
                .insertAfter($("#alert-container div:last-child"))
                .text("Success! " + data.id)
                .fadeOut(2000);
            },
            error: function(err) {
              $('<div class="alert alert-danger" role="alert"></div>')
                .insertAfter($("#alert-container div:last-child"))
                .text("Error! Try again.")
                .fadeOut(2000);
            } 
          });
    $('form').find("input[type=text]").val("");
    e.preventDefault();
    return false; // avoid to execute the actual submit of the form.
}); 