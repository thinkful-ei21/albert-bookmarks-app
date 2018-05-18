'use strict';

/* global Object */

const STORE = (function() {
  const bookmarks = [];

  const creationMode = false;

  const filterMode = false;

  const filterValue = 1;

  const synchBookmarks = function(response) {
    STORE.bookmarks = [];
  
    response.forEach((each) =>{
      const decoration = {isCollapsed: true};
      const decoratedObject = Object.assign(each, decoration);
      STORE.bookmarks.push(decoratedObject);
    });
  };
  
  const findById = function(id) {
    return STORE.bookmarks.find(each => each.id === id);
  };

  const findAndToggleById = function(id) {
    const foundItem = this.findById(id);
    foundItem.isCollapsed = !foundItem.isCollapsed;
  };

  return {
    bookmarks,
    creationMode,
    filterMode,
    filterValue,
    synchBookmarks,
    findById,
    findAndToggleById
  };
}());