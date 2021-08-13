//Waits for dom to load before using on input...
$(document).ready(function() {
  //Sets counter to equal the number of chars entered. If number of chars entered exceeds 140, counter should turn red and display negative number.
  $("#tweet-text").on("input", function(event) {

    let charsRemaining = 140 - $(this).val().length;
    let visibleCounter = $(this).next().find('.counter'); 

    //Update counter with chars remaining
    visibleCounter.val(charsRemaining); 

    //change color to red if more than 140 chars
    if (charsRemaining < 0) {
      visibleCounter.css("color", "red");
    } else {
      visibleCounter.css("color", "#545149");
    }
  })
})