'use strict';

/* global $ api STORE */

const bookmarksList = (function() {

  const createUserInputObj = function() {
    return {
      title: $('#title-input').val(),
      url: $('#url-input').val(),
      desc: $('#description-input').val(),
      rating: $('#rating-input').val()
    };
  };

  const getItemIdFromElement = function(item) {
    return $(item).closest('.js-bookmark-entry').data('bookmark-id');
  };

  const clearInputEntries = function() {
    $('#title-input').val('');
    $('#url-input').val('');
    $('#description-input').val('');
    $('#rating-input').val('1');
  };

  const handleFilterSelect = function() {
    $('.js-user-settings').on('change', '#js-ratings-filter', function() {
      STORE.filterValue = $('#js-ratings-filter').val();

      if(STORE.filterValue < 2) {STORE.filterMode = false;}
      else(STORE.filterMode = true);

      renderBookmarks();
    });
  };

  const handleToggleInputButton = function() {
    $('.js-user-settings').on('click', '.js-toggle-input-button', function(event) {
      event.preventDefault();
      STORE.creationMode = true;
      renderInputForm();
    });
  };

  const handleSaveButton = function() {
    $('.js-input-form').on('click', '.js-save-button', function(event) {
      event.preventDefault();

      const userInputObj = createUserInputObj();

      api.addBookmark(userInputObj, () => {
        api.getBookmarks(function(response) {
          STORE.synchBookmarks(response);
          clearInputEntries();
          renderBookmarks();
        });
      });

    });
  };

  const handleCancelButton = function() {
    $('.js-input-form').on('click', '.js-cancel-button', function(event) {
      event.preventDefault();
      clearInputEntries();
      STORE.creationMode = false;
      renderInputForm();
    });
  };

  const handleCollapseButton = function() {
    $('.js-bookmarks-list').on('click', '.js-collapse-button', function(event) {
      event.preventDefault();
      let clickedElementId = getItemIdFromElement(event.currentTarget);
      STORE.findAndToggleById(clickedElementId);
      renderBookmarks();
    });
  };

  const handleRemoveButton = function() {
    $('.js-bookmarks-list').on('click', '.js-remove-button', function(event) {
      event.preventDefault();
      const clickedElementId = getItemIdFromElement(event.currentTarget);
      api.removeBookmark(clickedElementId, () => {
        api.getBookmarks(function(response) {
          STORE.synchBookmarks(response);
          renderBookmarks();
        });
      });
    });
  };

  const generateHtml = function(bookmarksArray) {

    const htmlStringArray = [];

    bookmarksArray.forEach((each) => {

      let isCollapsed = '';
      if(each.isCollapsed === true) {isCollapsed = 'hidden';}

      let isFiltered = '';
      if(STORE.filterMode === true && each.rating < STORE.filterValue) {isFiltered = 'Filtered';}

      let starDisplay = '';
      let stars = each.rating;
      if(stars === 1) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';}
      if(stars === 2) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';}
      if(stars === 3) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';}
      if(stars === 4) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';}
      if(stars === 5) {starDisplay = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';}
  
      htmlStringArray.push(`
        <li class="js-bookmark-entry ${isFiltered}" data-bookmark-id="${each.id}">
          <button class="js-collapse-button">+</button>
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

  const renderInputForm = function() {
    let htmlString = '';

    if(STORE.creationMode === true) {
      htmlString = `
      <form action="#">
      <label class="js-title-input">Title:</label>
      <input class="js-title-input" id="title-input" type="text" /><br />
      <label class="js-url-input">URL:</label>
      <input class="js-url-input" id="url-input" type="text" /><br />
      <label class="js-description-input">Description:</label><br />
      <textarea class="js-description-input" id="description-input"></textarea><br />
      <label class="js-ratings-input">Rating:</label>
      <select id="rating-input">
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      <button class="js-save-button">Save</button>
      <button class="js-cancel-button">Cancel</button>
      </form>`;
    }

    $('.js-input-form').html(htmlString);
  };

  const renderBookmarks = function() {
    const htmlString = generateHtml(STORE.bookmarks);
    $('.js-bookmarks-list').html(htmlString);
  };

  const bindEventListeners = function() {
    handleFilterSelect();
    handleToggleInputButton();
    handleSaveButton();
    handleCancelButton();
    handleCollapseButton();
    handleRemoveButton();
  };

  return {
    renderInputForm,
    renderBookmarks,
    bindEventListeners
  };

}());