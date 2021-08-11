//Waits for dom to load before using the following .js code. 
$(document).ready(function() {

  //Listens for the submit event on tweet button. When pressed, sends entered tweet ot the tweetData "Database"
  $("#tweet-entry-area").on("submit", function(event) {
    //Prevent page from reloading once submit button pressed
    event.preventDefault();

    //Object representing typed in tweet (to get actual data append .val() to end)
    const $typedTweet = $(this).parent().find("#tweet-text");

    //String represented typed in tweet but in standard URL-encoded notation
    const $serializedTweet = $typedTweet.serialize() 

    //Send entered tweet data to the tweetData "database"
    $.ajax({url: '/tweets', data: $serializedTweet, method: 'POST'}).then(function(response) {
      console.log("Succesful, tweet passed to tweetData");
    })
  })  
});
