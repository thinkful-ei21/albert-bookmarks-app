'use strict';

/* global */

const STORE = (function() {
  const bookmarks = [];

  const isAdding = false;

  const generateBookmarks = function(response) {
    STORE.bookmarks = [];
    
    response.forEach((each) =>{
      STORE.bookmarks.push({
        id: each.id,
        title: each.title,
        url: each.url,
        desc: each.desc,
        rating: each.rating,
        isCollapsed: true
      });
    });
  };

  return{
    bookmarks,
    isAdding,
    generateBookmarks
  };
}());