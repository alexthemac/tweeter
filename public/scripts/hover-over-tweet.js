//Waits for dom to load before using on input...
$(document).ready(function() {
  console.log("mouse");
  //Add or remove box shadow when mouse enters tweet area
  $(".tweet").on({
    //Add box shadow 
    mouseenter: function () {
      $(this).parent().css("box-shadow", "10px 5px 5px green");
    },
    //Remove box shadow
    mouseleave: function () {
      $(this).parent().css("box-shadow", "revert");
    }
  })
  //Add or remove color from icon
  $("#flag").on({
    //Change icon green 
    mouseenter: function () {
      $(this).css("color", "green");
    },
    //Remove green color
    mouseleave: function () {
      $(this).css("color", "revert");
    }
  })
  //Add or remove color from icon
  $("#retweet").on({
    //Change icon green 
    mouseenter: function () {
      $(this).css("color", "green");
    },
    //Remove green color
    mouseleave: function () {
      $(this).css("color", "revert");
    }
  })
  //Add or remove color from icon
  $("#heart").on({
    //Change icon green 
    mouseenter: function () {
      $(this).css("color", "green");
    },
    //Remove green color
    mouseleave: function () {
      $(this).css("color", "revert");
    }
  })  
});
//   $("#tweet-container").on("hover", function(event) {

//     console.log("MOUSEOVER!")

//     // //--------DELETE ON FINAL SUBMISSION, FOR OWN INFORMATION
//     // // $(this) references the HTML node for the text form input (because we have #tweet-text which is assigned to the text form input)
//     // // $(this).va() refers the value entered into the text form
//     // // $(this).val().length is the lenght of string in the text form box
  
//     // let charsRemaining = 140 - $(this).val().length;
//     // let visibleCounter = $(this).next().find('.counter'); //$(this).next().find('.counter') is same as $('.counter');

//     // //Update counter with chars remaining
//     // visibleCounter.val(charsRemaining); 

//     // //change color to red if more than 140 chars
//     // if (charsRemaining < 0) {
//     //   visibleCounter.css("color", "red");
//     // } else {
//     //   visibleCounter.css("color", "#545149");
//     // }
//   })
// })