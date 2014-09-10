
$(document).ready(function() {
  $(document).keydown(function (e) {
    if (e.keyCode == 32) {
     $(".manual-input").toggle();
     $(".auto-input").toggle();
    }
  })
});

$("#checkin").submit(function(e) {
    $.ajax({
           type: "POST",
           url: "/checkin2",
           data: $("#checkin").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the php script.
           }
         });
    $("#checkin").clear();
    e.preventDefault();
    return false; // avoid to execute the actual submit of the form.
}); 