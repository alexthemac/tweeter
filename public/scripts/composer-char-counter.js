//Waits for dom to load before using on input...
$(document).ready(function() {
  //Sets counter to equal the number of chars entered. If number of chars entered exceeds 140, counter should turn red and display negative number.
  $("#tweet-text").on("input", function(event) {
    // $(this) references the HTML node for the text form input (because we have #tweet-text which is assigned to the text form input)
    // $(this).va() refers the value entered into the text form
    // $(this).val().length is the lenght of string in the text form box
  
    let charsRemaining = 140 - $(this).val().length;
    let visibleCounter = $(this).next().find('.counter'); //same as $('.counter');

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