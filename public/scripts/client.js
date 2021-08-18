/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Takes tweet data and formats it into HTML
  const createTweetElement = function(tweetObj) {

    const $tweet = `<article class="tweet-article">
                      <header>
                        <div class="header-left">
                          <div><img src=${tweetObj.user.avatars}></div>
                          <div>${tweetObj.user.name}</div>
                        </div>
                        <div class="header-right">${tweetObj.user.handle}</div>
                      </header>
                      <p>${escape(tweetObj.content.text)}</p>
                      <footer>
                        <div>${timeago.format(tweetObj.created_at)}</div> 
                        <div class="footer-icons">
                          <div class="flag"><i class="fas fa-flag"></i></div>
                          <div class="retweet"><i class="fas fa-retweet"></i></div>
                          <div class="heart"><i class="fas fa-heart"></i></div>
                        </div>
                      </footer>
                    </article>`;
    return $tweet;
  };

  //Renders tweets on DOM
  const renderTweets = function(tweets) {

    let $returnTweetHTML;

    //Loops through all tweet data in tweet Data array
    for (const tweet of tweets) {
      //passes each tweet data to createTweetElement function
      $returnTweetHTML = createTweetElement(tweet);
      //returned HTML is then prepended to index.html
      $('.tweets-container').prepend($returnTweetHTML);
    }
  };

  //Sends tweets located at /tweets to renderTweets function
  const loadTweets = function() {
    //Performs GET request
    $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
    //Once data recieved (async), send to renderTweets function
      .then(function(response) {
        renderTweets(response);
      });
  };

  loadTweets();

  //Sends last entered tweet to renderTweets function
  const loadLastTweet = function() {
    $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
    //Once data recieved (async), send to renderTweets function
      .then(function(response) {
      //Last item in response array is last tweet
        const lastTweet = response[response.length - 1];
        //passes the last created tweet data (last element in response array) to createTweetElement function
        $returnTweetHTML = createTweetElement(lastTweet);
        //returned HTML is then prepended to index.html (added at top: prepend. added at bottom: append)
        $('.tweets-container').prepend($returnTweetHTML);
      });
  };

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
      //Adds error message at top of new-tweet section
      $(".error").remove();
      $('.new-tweet').prepend(`<div class="error"><i class="fas fa-exclamation-triangle"></i>&nbsp&nbsp&nbspTweet is empty. Please try again&nbsp&nbsp&nbsp<i class="fas fa-exclamation-triangle"></i></div>`);
    } else if ($typedTweet.length > 140) {
      //Adds error message at top of new-tweet section
      $(".error").remove();
      $('.new-tweet').prepend(`<div class="error"><i class="fas fa-exclamation-triangle"></i>&nbsp&nbsp&nbspTweet is too long (140 characters max)! Please try again&nbsp&nbsp&nbsp<i class="fas fa-exclamation-triangle"></i></div>`);
    //If tweet is correct size and not empty, send tweet data to database.
    } else {
      //Removes error message, if there is one.
      $(".error").remove();

      //String represented typed in tweet but in standard URL-encoded notation
      const $serializedTweet = $typedTweetObj.serialize();

      //Send entered tweet data to the tweetData "database"
      $.ajax({url: '/tweets', data: $serializedTweet, method: 'POST'})
        .then(function(response) {
        //Loads the most recently created tweet on top of other tweets
          loadLastTweet();
        });
    }
    //Clear text area after data has been sent 
    $('#tweet-text').val('');
  });

  //Transform text entered to prevent an XSS attack with escaping (is used inside createTweetElement function)
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Hide new tweet entry area on start
  $(".new-tweet").hide();

  //Toggle new tweet entry area when "Write a new tweet" is clicked
  $(".WriteANewTweet").click(function() {
    $(".new-tweet").toggle();
  });
});

