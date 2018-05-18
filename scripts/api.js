'use strict';

/* global $ bookmarksList */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/albert/bookmarks/';

  const getBookmarks = function(callback) {
    $.ajax({
      url: BASE_URL,
      method: 'GET',
      dataType: 'json',
      success: callback
    });
  };

  const addBookmark = function(newDataObj, callback) {
    const newData = JSON.stringify(newDataObj);

    $.ajax({
      url: BASE_URL,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: newData,
      success: callback,
      error: function(response) {
        bookmarksList.generateErrorMessage(response.responseJSON.message);
      }
    });
  };

  const removeBookmark = function(id, callback) {
    $.ajax({
      url: BASE_URL + id,
      method: 'DELETE',
      success: callback
    });
  };

  return {
    getBookmarks,
    addBookmark,
    removeBookmark
  };
}());