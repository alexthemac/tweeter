/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { response } = require("express");

$(document).ready(function() {

  //Database of all tweets (DEPRECATED: replaced by actual database from /tweets. Actual tweets are GET by loadTweets function below.)
  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  //Takes tweet data and formats it into HTML
  const createTweetElement = function (tweetObj) {

    const $tweet = `<article class="tweet-article">
                      <header>
                        <div class="header-left">
                          <div><img src=${tweetObj.user.avatars}></div>
                          <div>${tweetObj.user.name}</div>
                        </div>
                        <div class="header-right">${tweetObj.user.handle}</div>
                      </header>
                      <p>${tweetObj.content.text}</p>
                      <footer>
                        <div>${timeago.format(tweetObj.created_at)}</div> 
                        <div class="footer-icons">
                          <div class="flag"><i class="fas fa-flag"></i></div>
                          <div class="retweet"><i class="fas fa-retweet"></i></div>
                          <div class="heart"><i class="fas fa-heart"></i></div>
                        </div>
                      </footer>
                    </article>`
    return $tweet;
  }

  //Renders tweets.
  const renderTweets = function(tweets) {

    let $returnTweetHTML;

    //Loops through all tweet data in tweet Data array
    for (const tweet of tweets) {
      //passes each tweet data to createTweetElement function
      $returnTweetHTML = createTweetElement(tweet);
      //returned HTML is then prepended to index.html (added at top: prepend. added at bottom: append)
      $('.tweets-container').prepend($returnTweetHTML)
    }
  }

  //Call function to render tweets (DEPRECATED: replaced by loadTweets function below. Uses actual database at /tweets as opposed to variable above)
  // renderTweets(tweetData);

  //Sends tweets located at /tweets to renderTweets function
  const loadTweets = function() {
    //Performs GET request
    $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
    //Once data recieved (async), send to renderTweets function
    .then(function(response) {
      renderTweets(response)
    });
  }

  //Calls loadTweets on page load. This allows it to run asynchronously. Once ready the response is sent to the renderTweets function.
  loadTweets();

  //Listens for the submit event on tweet button. When pressed, sends entered tweet to the tweetData "Database"
  $("#tweet-entry-area").on("submit", function(event) {
    //Prevent page from reloading once submit button pressed
    event.preventDefault();

    //Object representing typed in tweet
    const $typedTweetObj = $(this).parent().find("#tweet-text");
    //Actual text typed in
    const $typedTweet = $typedTweetObj.val();

    //Alert if tweet entered is empty or too long. 
    if (!$typedTweet) {
      alert("Tweet is empty! Please try again.")
    } else if ($typedTweet.length > 140) {
      alert("Tweet is too long! Please try again.")
    //If tweet is correct size and not empty, send tweet data to database.
    } else {
      //String represented typed in tweet but in standard URL-encoded notation
      const $serializedTweet = $typedTweetObj.serialize() 

      //Send entered tweet data to the tweetData "database"
      $.ajax({url: '/tweets', data: $serializedTweet, method: 'POST'})
      .then(function(response) {
        //Empty the currently loaded tweets (prevents duplicates)
        $(".tweets-container").empty();
        //Loads tweets (including newest tweet)
        loadTweets();
      })
    };
  })
});

