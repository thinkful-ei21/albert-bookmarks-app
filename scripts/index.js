'use strict';

/* global $ api bookmarksList STORE */

$(document).ready(function() {

  api.getBookmarks(function(response) {
    STORE.synchBookmarks(response);
    bookmarksList.renderBookmarks();
    console.log('document ready function ran, STORE.bookmarks contains', STORE.bookmarks);
  });

  bookmarksList.renderInputForm();
  bookmarksList.renderBookmarks();
  bookmarksList.bindEventListeners();

});