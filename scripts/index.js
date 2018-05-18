'use strict';

/* global $ api bookmarksList STORE */

$(document).ready(function() {

  api.getBookmarks(function(response) {
    STORE.synchBookmarks(response);
    bookmarksList.renderBookmarks();
  });

  bookmarksList.renderInputForm();
  bookmarksList.renderBookmarks();
  bookmarksList.bindEventListeners();

});