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
              // TODO(ruyan): make this less gross if possible
              switch (data.error) {
                case 0:
                  $('<div class="alert alert-success" role="alert"></div>')
                    .insertAfter($("#alert-container div:last-child"))
                    .text("Welcome " + data.fname + " :)")
                    .fadeOut(2000);
                  break;
                case 2:
                  $('<div class="alert alert-danger" role="alert"></div>')
                    .insertAfter($("#alert-container div:last-child"))
                    .text("Error: User does not exist.")
                    .fadeOut(2000);
                  break;
              }
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