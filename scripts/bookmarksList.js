'use strict';

/* global $ api STORE */

const bookmarksList = (function() {

  const getItemIdFromElement = function(item) {
    return $(item).closest('.js-bookmark-entry').data('bookmark-id');
  };

  const handleCollapseButton = function() {
    $('.js-bookmarks-list').on('click', '.js-collapse-button', function(event) {
      event.preventDefault();
      let clickedElementId = getItemIdFromElement(event.currentTarget);
      STORE.findAndToggleById(clickedElementId);
      render();
    });
  };

  const handleRemoveButton = function() {
    $('.js-bookmarks-list').on('click', '.js-remove-button', function(event) {
      event.preventDefault();
      let clickedElementId = getItemIdFromElement(event.currentTarget);
      api.removeBookmark(clickedElementId, () => {
        api.getBookmarks(function(response) {
          STORE.synchBookmarks(response);
          render();
        });
      });
      // STORE.findAndDeleteById(clickedElementId);
    });

    // below is attempt to refresh html content after bookmark deletion
    api.getBookmarks(function(response) {
      STORE.synchBookmarks(response);
      render();
      console.log('document ready function ran, STORE.bookmarks contains', STORE.bookmarks);
    });
  };

  const generateHtml = function(bookmarksArray) {

    const htmlStringArray = [];

    bookmarksArray.forEach((each) => {

      let isCollapsed = '';
      if(each.isCollapsed === true) {isCollapsed = 'hidden';}

      let starDisplay = '';
      let stars = each.rating;
      if(stars === 0) {starDisplay = '(no rating)';}
      if(stars === 1) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';}
      if(stars === 2) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';}
      if(stars === 3) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';}
      if(stars === 4) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';}
      if(stars === 5) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';}
  
      htmlStringArray.push(`
        <li class="js-bookmark-entry" data-bookmark-id="${each.id}">
          <button class="js-collapse-button">-</button>
          <h3>${each.title}</h3>
          <a class="${isCollapsed}" href="${each.url}" target="blank">${each.url}</a>
          <p class="${isCollapsed}">${each.desc}</p>
          <button class="js-remove-button ${isCollapsed}">Remove</button>
          <p>${starDisplay}</p>
        </li>`
      );
    });

    return htmlStringArray.join('');
  };

  const render = function() {
    const htmlString = generateHtml(STORE.bookmarks);
    $('.js-bookmarks-list').html(htmlString);
  };

  const bindEventListeners = function() {
    handleCollapseButton();
    handleRemoveButton();
  };

  return {
    render,
    bindEventListeners
  };
}());