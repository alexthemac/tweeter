// //Waits for dom to load before using the following .js code. 
// $(document).ready(function() {

//   //Listens for the submit event on tweet button. When pressed, sends entered tweet ot the tweetData "Database"
//   $("#tweet-entry-area").on("submit", function(event) {
//     //Prevent page from reloading once submit button pressed
//     event.preventDefault();

//     // $(".tweets-container").empty();

//     //Object representing typed in tweet
//     const $typedTweetObj = $(this).parent().find("#tweet-text");
//     //Actual text typed in
//     const $typedTweet = $typedTweetObj.val();

//     //Alert if tweet entered is empty or too long. 
//     if (!$typedTweet) {
//       alert("Tweet is empty! Please try again.")
//     } else if ($typedTweet.length > 140) {
//       alert("Tweet is too long! Please try again.")
//     //If tweet is correct size and not empty, send tweet data to database.
//     } else {
//       //String represented typed in tweet but in standard URL-encoded notation
//       const $serializedTweet = $typedTweetObj.serialize() 

//       //Send entered tweet data to the tweetData "database" (.then not required...but nice to have)
//       $.ajax({url: '/tweets', data: $serializedTweet, method: 'POST'})
//       .then(function(response) {
//         console.log("Succesful, tweet passed to tweetData");
//       })
//     };
//   })  
// });
