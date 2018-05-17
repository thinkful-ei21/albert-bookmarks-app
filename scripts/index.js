'use strict';

/* global $ api bookmarksList STORE */

// sample data and functions to pass into api functions
const sampleFunc = function(response) {
  console.log(STORE.bookmarks);
};

const sampleObj = {
  title: 'Sample Title',
  url: 'https://www.example.com',
  desc: 'Example description',
  rating: 4
};



$(document).ready(function() {

  // test to make sure code can post sample to api, it works!!
  // api.addBookmark(sampleObj, sampleFunc);

  api.getBookmarks(function(response) {
    STORE.synchBookmarks(response);
    bookmarksList.render();
    console.log('document ready function ran, STORE.bookmarks contains', STORE.bookmarks);
  });

  bookmarksList.render();
  bookmarksList.bindEventListeners();
});