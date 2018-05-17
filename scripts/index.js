'use strict';

/* global $ api bookmarksList STORE */

// sample data and functions to pass into api functions
const sampleFunc = function(response) {
  console.log(STORE.bookmarks);
};

const sampleObj = {
  title: 'Wikipedia',
  url: 'https://www.wikipedia.com',
  desc: 'The magic page of the internet',
  rating: 5
};


$(document).ready(function() {

  // test to make sure code can post ample to api, it works!!
  // api.addBookmark(sampleObj, sampleFunc);

  // test to make sure code can delete from api, it works, but need to decide on what to do on callback
  // api.removeBookmark('<inser id string>', api.getBookmarks);

  api.getBookmarks(function(response) {
    STORE.synchBookmarks(response);
    bookmarksList.render();
    console.log('document ready function ran, STORE.bookmarks contains', STORE.bookmarks);
  });

  bookmarksList.render();
  bookmarksList.bindEventListeners();
});

// use this to refresh bookmark in STORE
// api.getBookmarks(function(response) {
//   STORE.synchBookmarks(response);
// });
