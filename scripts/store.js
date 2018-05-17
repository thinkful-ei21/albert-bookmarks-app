'use strict';

/* global */

const STORE = (function() {
  const bookmarks = [];

  const isAdding = false;

  const synchBookmarks = function(response) {
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


  // const findAndToggleChecked = function(id) {
  //   const item = this.findById(id);
  //   item.checked = !item.checked;
  // };
  
  const findById = function(id) {
    return STORE.bookmarks.find(each => each.id === id);
  };

  const findAndToggleById = function(id) {
    const foundItem = this.findById(id);
    foundItem.isCollapsed = !foundItem.isCollapsed;
  };

  return{
    bookmarks,
    isAdding,
    synchBookmarks,
    findById,
    findAndToggleById
  };
}());