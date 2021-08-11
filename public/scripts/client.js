/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

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
      //returned HTML is then appended to index.html
      $('.tweets-container').append($returnTweetHTML)
    }
  }
  
  //Database of all tweets
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  //Call function to render tweets
  renderTweets(tweetData);
});

